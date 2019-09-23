const { Router } = require('express');
const passport = require('passport');
const { passport: passportConfig } = require('../config');

const router = Router();

function formatProfile(user) {
  const {
    profile: { photos, displayName: fullName },
  } = user;
  const [{ value: image = null } = {}] = photos || [];
  return { profile: { fullName, image } };
}

router.get('/session', (req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.status(404).json({ status: 'NOT FOUND' });
  } else {
    res.json(formatProfile(req.user));
  }
});

router.get(
  '/callback',
  passport.authenticate('google', passportConfig),
  ({ app, session, user }, res) => {
    const io = app.get('io');
    io.in(session.socketId).emit('authenticated', formatProfile(user));
    res.sendStatus(200);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

router.use('/login', (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/login', passport.authenticate('google', passportConfig));

module.exports = router;
