module.exports = {
  apiBase: 'https://photoslibrary.googleapis.com/v1',
  oAuth: {
    callbackURL: `${process.env.REACT_APP_API_BASE}/auth/callback`,
    clientID: `${process.env.CLIENT_ID}.apps.googleusercontent.com`,
    clientSecret: process.env.CLIENT_SECRET
  },
  passport: {
    scope: [
      'https://www.googleapis.com/auth/photoslibrary.sharing',
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'profile'
    ],
    failureFlash: true,
    session: true
  },
  requests: {
    albumPageSize: 50,
    searchLimit: 150,
    searchPageSize: 100
  },
  session: {
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }
};
