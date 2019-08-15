const { Router } = require('express');
const { addAuthorisedUser, getAuthorisedUsers } = require('./user');
const router = Router();

router.get('/users', async (req, res) => {
  try {
    const users = await getAuthorisedUsers();
    return res.json(users);
  } catch (err) {
    return res.sendStatus('500').json(err);
  }
});

router.post('/users', async (req, res) => {
  const userEmail = req.body.email;
  try {
    await addAuthorisedUser(userEmail);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus('500').json(err);
  }
});
