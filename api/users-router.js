const { Router } = require('express');
const { addAuthorizedUser, getAuthorizedUsers } = require('./user');
const router = Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getAuthorizedUsers();
    return res.json(users);
  } catch (err) {
    return res.sendStatus('500').json(err);
  }
});

router.post('/users', async (req, res) => {
  const { userEmail, fullName, admin } = req.body;
  try {
    await addAuthorizedUser(userEmail, fullName, admin);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus('500').json(err);
  }
});
