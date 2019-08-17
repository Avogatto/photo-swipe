const http = require('http');
const cors = require('cors');
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
const { initializeCache, joinPendingAlbums } = require('./albums');

const app = express();
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
        emails: [{ value: id }],
      } = profile;

      await joinPendingAlbums(token, id);

      done(null, { profile, token, refreshToken, expiry });
    }
  )
);

app.use(morgan('dev'));
app.use(cors({ origin: process.env.REACT_APP_BASE, credentials: true }));
app.use(bodyParser.json());
app.use(session({ ...sessionConfig, store: new FileStore({}) }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.use(checkToken);
app.use('/albums', albumsRouter);
app.use('/users', usersRouter);

async function startServer() {
  await initializeCache();
  const server = http.createServer(app);
  const io = socketio(server);
  app.set('io', io);
  server.listen(8080, () => console.log('listening on port 8080!'));
}

startServer();
