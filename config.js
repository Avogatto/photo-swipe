const { clientId, clientSecret, sessionSecret } = require('credentials.json');

module.exports = {
  apiBase: 'https://photoslibrary.googleapis.com/v1',
  oAuth: {
    callbackURL: 'http://localhost:8080/authenticated',
    clientID: clientId,
    clientSecret,
  },
  passport: {
    scope: [
      'https://www.googleapis.com/auth/photoslibrary.sharing',
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'profile',
    ],
    failureFlash: true,
    session: true,
  },
  requests: {
    albumPageSize: 50,
    searchLimit: 150,
    searchPageSize: 100,
  },
  session: {
    resave: true,
    saveUninitialized: true,
    secret: sessionSecret,
  },
};
