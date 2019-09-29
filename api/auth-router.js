const { Router } = require('express');
const passport = require('passport');
const { passport: passportConfig } = require('../config');

const router = Router();

router.get('/session', (req, res) => {
  if (!req.user || !req.isAuthenticated()) {
    res.status(404).json({ status: 'NOT FOUND' });
  } else {
    const { admin, profile } = req.user;
    res.json({ admin, profile });
  }
});

router.get(
  '/callback',
  passport.authenticate('google', passportConfig),
  async (req, res) => {
    const { app, session, user } = req;
    const { admin, authorized, error, profile } = user;
    const { socketId } = session;
    const io = app.get('io');

    if (authorized) {
      io.in(socketId).emit('authenticated', { admin, profile });
    } else {
      if (error) {
        io.in(socketId).emit('error', { error });
      } else {
        io.in(socketId).emit('unauthorized', { profile });
      }
      req.logout();
      session.destroy();
    }
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
