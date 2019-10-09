const { Router } = require('express');
const {
  createAlbum,
  getAlbums,
  getAlbumPhotos,
  getSharedAlbums,
  joinAlbum,
  activateAlbum,
  getTaggedUsers,
  updateTaggedUsers,
} = require('./albums');
const { addShareToken, getSharedUsers, addTaggedAlbum } = require('./user');
const {
  getUserDecisionsForPhoto,
  getAllUserDecisionsForAlbum,
  updateUserDecision,
} = require('./decisions-controller');

const router = Router();

router.post('/memberships', async (req, res) => {
  const { shareToken } = req.body;
  const userToken = req.user.token;

  console.log('who is user?', req.user);

  try {
    const album = await joinAlbum(userToken, shareToken);
    res.json({ album });
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.post('/:albumId/activate', async (req, res) => {
  const { albumId } = req.params;
  const userToken = req.user.token;

  try {
    // this will add sharetokens to users who were tagged in this specific album
    const [shareToken, shareUsers] = await Promise.all([
      activateAlbum(userToken, albumId),
      getSharedUsers(albumId),
    ]);
    await Promise.all[shareUsers.map(user => addShareToken(user, shareToken))];
    res.json({ shareToken });
  } catch (err) {
    console.error('ERRRRRRR', err);
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
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.get('/:albumId/photos/:photoId/users', async (req, res) => {
  const { albumId, photoId } = req.params;

  try {
    const taggedUsers = await getTaggedUsers(albumId, photoId);
    res.json({ taggedUsers });
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.post('/:albumId/photos/:photoId/users', async (req, res) => {
  const { albumId, photoId } = req.params;
  const { taggedUsers } = req.body;

  try {
    const promises = [updateTaggedUsers(albumId, photoId, taggedUsers)];
    taggedUsers.forEach(userEmail => {
      promises.push(addTaggedAlbum(userEmail, albumId));
    });
    await Promise.all(promises);
    res.json({ taggedUsers });
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.get('/:albumId/decisions/:userId', async (req, res) => {
  const { albumId, userId } = req.params;
  try {
    const results = await getAllUserDecisionsForAlbum(albumId, userId);
    res.json(results);
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.get('/:albumId/photos/:photoId/decision/:userId', async (req, res) => {
  const { albumId, photoId, userId } = req.params;
  try {
    const decision = await getUserDecisionsForPhoto(albumId, photoId, userId);
    res.json({
      decision,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/:albumId/photos/:photoId/decision/:userId', async (req, res) => {
  const { albumId, userId } = req.params;
  const { decision } = req.body;

  if (decision !== 'Approved' || decision !== 'Rejected') {
    res.status(400).json({
      message: `Invalid decision value. The value must be 'Approved' or 'Rejected'`,
    });
  }

  try {
    await updateUserDecision(albumId, photoId, userId, decision);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/shared', async (req, res) => {
  const userToken = req.user.token;

  try {
    const albums = await getSharedAlbums(userToken);
    console.log('Total number of shared albums:', albums.length);
    res.json({ albums });
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  const userToken = req.user.token;
  try {
    const albums = await getAlbums(userToken);
    console.log('Total number of albums:', albums.length);
    res.json({ albums });
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const userToken = req.user.token;
  const title = `PS Album: ${req.body.albumTitle}`;
  try {
    const album = await createAlbum(userToken, title);
    res.json({ album });
  } catch (err) {
    console.error('ERRRRRRR', err);
    res.status(500).json(err);
  }
});

module.exports = router;
