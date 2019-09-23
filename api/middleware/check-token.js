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
  return result;
}

module.exports = async (req, res, next) => {
  if (!req.user || !req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    const { expiry, refreshToken } = req.user;
    const now = new Date();
    if (now.getTime() >= expiry) {
      try {
        const { access_token: token, expires_in: expiresIn } = await getAccessToken(refreshToken);
        const updatedExpiry = now.setSeconds(now.getSeconds() + (expiresIn - 300));
        req.session.passport.user.token = token;
        req.session.passport.user.expiry = updatedExpiry;
        req.session.save((err) => {
          if (err) {
            console.error('Failed to update token on session', err);
            next(err);
          } else {
            console.log('Successfully refreshed token');
            next();
          }
        });
      } catch (err) {
        console.error('Failed to refresh access token', err);
        next(err);
      }
    } else {
      next();
    }
  }
};
