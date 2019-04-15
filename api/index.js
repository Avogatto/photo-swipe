const http = require('http');
const cors = require('cors');
const { OAuth2Strategy } = require('passport-google-oauth');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sessionFileStore = require('session-file-store');
const passport = require('passport');
const socketio = require('socket.io');
const { oAuth: oAuthConfig, session: sessionConfig } = require('../config');
const { initializeCache } = require('./data-access');
const authRouter = require('./routers/auth');
const albumsRouter = require('./routers/albums');

const app = express();
const FileStore = sessionFileStore(session);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new OAuth2Strategy(
    oAuthConfig,
    // TODO: save the user to the database in this callback
    (token, refreshToken, profile, done) => done(null, { profile, token })
  )
);

app.use(cors({ origin: process.env.REACT_APP_BASE, credentials: true }));
app.use(bodyParser.json());
app.use(session({ ...sessionConfig, store: new FileStore({}) }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/albums', albumsRouter);

async function startServer() {
  await initializeCache();
  const server = http.createServer(app);
  const io = socketio(server);
  app.set('io', io);
  server.listen(8080, () => console.log('listening on port 8080!'));
}

startServer();
