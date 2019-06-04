const fetch = require('node-fetch');
const { oAuth: oAuthConfig } = require('../../config');

async function getAccessToken(refreshToken) {
  const searchParams = {
    client_id: oAuthConfig.clientID,
    client_secret: oAuthConfig.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v4/token?${searchParamsString}`,
    { method: 'POST' }
  );
  const result = await response.json();
  if (response.status !== 200) throw new Error(JSON.stringify(result));
  return result.access_token;
}

module.exports = async (req, res, next) => {
  if (!req.user || !req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    const { expiry, refreshToken } = req.user;
    if (Date.now() >= expiry) {
      try {
        const { access_token: token, expires_in: expiresIn } = await getAccessToken(refreshToken);
        const now = new Date();
        const expiry = now.setSeconds(now.getSeconds() + (expiresIn - 300));
        req.session.passport.user.token = token;
        req.session.passport.user.expiry = expiry;
        req.session.save((err) => {
          if (err) {
            console.log('Failed to update token on session', err);
            return next(err);
          }
          return next();
        });
      } catch (err) {
        console.log('Failed to refresh access token', err);
        return next(err);
      }
    }
    console.log('Token is still valid');
    next();
  }
};
