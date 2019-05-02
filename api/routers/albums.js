const { Router } = require('express');
const uuid = require('uuid');
const {
  createAlbum,
  getAlbums,
  getSharedAlbums,
  joinAlbum,
  shareAlbum,
} = require('../data-access');

const router = Router();

router.use((req, res, next) => {
  if (!req.user || !req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    next();
  }
})

router.post('/memberships', async(req, res) => {
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

router.get('/:albumId/share-token', async(req, res) => {
  const { albumId } = req.params;
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

router.get('/shared', async(req, res) => {
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

router.get('/', async(req, res) => {
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

router.post('/', async(req, res) => {
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

module.exports = router;
