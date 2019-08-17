const { Router } = require('express');
const uuid = require('uuid');
const {
  createAlbum,
  getAlbums,
  getAlbumPhotos,
  getSharedAlbums,
  joinAlbum,
  shareAlbum,
} = require('./albums');
const { addShareToken } = require('./user');

const router = Router();

router.post('/memberships', async (req, res) => {
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

router.post('/:albumId/share-token', async (req, res) => {
  const { albumId } = req.params;
  const userToken = req.user.token;
  const userId = req.user.profile.id;
  const shareUser = req.body.shareUser;
  try {
    const album = await shareAlbum(userToken, userId, albumId, shareUser);
    await addShareToken(shareUser);
    res.json({ album });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.get('/:albumId/photos', async (req, res) => {
  const { albumId } = req.params;
  const userToken = req.user.token;
  try {
    const photos = await getAlbumPhotos(userToken, albumId);
    res.json({ photos });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.get('/shared', async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
  const userToken = req.user.token;
  const userId = req.user.profile.id;
  const title = `PS Album: ${req.body.albumTitle}`;
  try {
    const album = await createAlbum(userToken, userId, title);
    res.json({ album });
  } catch (err) {
    console.log('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

module.exports = router;
