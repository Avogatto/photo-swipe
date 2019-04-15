const { Router } = require('express');
const passport = require('passport');
const { passport: passportConfig } = require('../../config');

const router = Router();

router.get('/callback', passport.authenticate('google', passportConfig),
  ({ app, session, user }, res) => {
    const io = app.get('io');
    io.in(session.socketId).emit('authenticated', { name: user.profile.displayName });
    res.sendStatus(200);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});

router.use('/login',(req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

router.get('/login', passport.authenticate('google', passportConfig));

module.exports = router;