const http = require('http');
const path = require('path');
const { OAuth2Strategy } = require('passport-google-oauth');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sessionFileStore = require('session-file-store');
const passport = require('passport');
const socketio = require('socket.io');
const firebase = require('firebase');
const morgan = require('morgan');

firebase.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));

const { oAuth: oAuthConfig, session: sessionConfig } = require('../config');
const authRouter = require('./auth-router');
const albumsRouter = require('./albums-router');
const usersRouter = require('./users-router');
const checkToken = require('./middleware/check-token');
const { joinPendingAlbums } = require('./albums');
const { getUserProfile } = require('./user');

const app = express();
const apiRouter = express.Router();
const FileStore = sessionFileStore(session);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new OAuth2Strategy(
    oAuthConfig,
    async (token, refreshToken, params, profile, done) => {
      const { expires_in: expiresIn } = params;
      const now = new Date();
      const expiry = now.setSeconds(now.getSeconds() + (expiresIn - 300));
      const {
        photos,
        displayName: fullName,
        emails: [{ value: email }],
      } = profile;
      const [{ value: image = null } = {}] = photos || [];
      const data = {
        admin: null,
        authorized: false,
        profile: { fullName, image, email },
        token,
        refreshToken,
        expiry,
      };
      try {
        const { admin, authorized } = await getUserProfile(email);
        if (authorized) await joinPendingAlbums(token, email);
        done(null, { ...data, admin, authorized });
      } catch (err) {
        done(null, { ...data, error: err.toString() });
      }
    }
  )
);

app.use(express.static(path.join(__dirname, '../build')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({ ...sessionConfig, store: new FileStore({}) }));
app.use(passport.initialize());
app.use(passport.session());

apiRouter.use('/albums', albumsRouter);
apiRouter.use('/users', usersRouter);

app.use('/auth', authRouter);
app.use('/api', checkToken, apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 8080;
app.set('io', io);
server.listen(port, () => console.log(`listening on port ${port}!`));
