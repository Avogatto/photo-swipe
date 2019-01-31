const { OAuth2Strategy } = require('passport-google-oauth');
const express = require('express');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const bodyParser = require('body-parser');
const passport = require('passport');
const uuid = require('uuid');
const {
  oAuth: oAuthConfig,
  passport: passportConfig,
  session: sessionConfig
} = require('../config');
const {
  createAlbum,
  getAlbums,
  getSharedAlbums,
  initializeCache,
  joinAlbum,
  shareAlbum,
} = require('./data-access');

const app = express();
const FileStore = sessionFileStore(session);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(new OAuth2Strategy(
  oAuthConfig,
  (token, refreshToken, profile, done) => done(null, { profile, token },
)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ ...sessionConfig, store: new FileStore({}) }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(`User authenticated? ${req.isAuthenticated()}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

app.get('/login', passport.authenticate('google', passportConfig));

app.get('/authenticated', passport.authenticate(
  'google',
  { failureRedirect: '/', failureFlash: true, session: true }),
  (req, res) => {
    console.log('User has logged in.');
    res.redirect('/');
  });

app.get('/get-albums', async(req, res) => {
  if (!req.user || !req.isAuthenticated()) res.redirect('/login');
  const userToken = req.user.token;
  const userId = req.user.profile.id;
  try {
    const albums = await getAlbums(userToken, userId);
    console.log('Total number of albums:', albums.length);
    res.json({ albums });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/create-album', async(req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  const userToken = req.user.token;
  const userId = req.user.profile.id;
  const title = `PS Album ${uuid.v4()}`;
  try {
    const album = await createAlbum(userToken, userId, title);
    res.json({ album });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

app.post('/join-album', async(req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  const { shareToken } = req.body;
  const userToken = req.user.token;
  const userId = req.user.profile.id;

  console.log('who is user?', req.user);

  try {
    const album = await joinAlbum(userToken, userId, shareToken);
    res.json({ album });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

app.post('/share-album', async(req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }
  const { albumId } = req.body;
  const userToken = req.user.token;
  const userId = req.user.profile.id;
  try {
    const album = await shareAlbum(userToken, userId, albumId);
    res.json({ album });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

app.get('/get-shared-albums', async(req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.redirect('/login');
    return;
  }

  const userToken = req.user.token;
  const userId = req.user.profile.id;

  try {
    const albums = await getSharedAlbums(userToken, userId);
    console.log('Total number of shared albums:', albums.length);
    res.json({ albums });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

async function startServer() {
  await initializeCache();
  app.listen(8080, () => console.log('listening on port 8080!'));
};

startServer();
