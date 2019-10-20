const firebase = require('firebase');

const db = firebase.firestore();

async function getPhotosTaggedWithUser(albumId, userId) {
  console.log('albumid', albumId);
  console.log('userid', userId);

  const { docs } = await db
    .collection('albums')
    .doc(albumId)
    .collection('photos')
    .where('taggedUsers', 'array-contains', userId)
    .get();

  const result = docs.map(doc => {
    console.log('what', doc);
    return doc;
  });

  console.log('these are photos', result);
}

async function getUserDecisionForPhoto(albumId, photoId, userId) {
  try {
    const photo = await db
      .collection('albums')
      .doc(albumId)
      .collection('photos')
      .doc(photoId)
      .get();

    if (!photo.exists) {
      return 'Pending';
    }
    return photo.data().decisions[userId] || 'Pending';
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAllUserDecisionsForAlbum(albumId, userId) {
  try {
    const photos = await db
      .collection('albums')
      .doc(albumId)
      .collection('photos')
      .where('taggedUsers', 'array-contains', userId)
      .get();

    return photos.reduce((obj, photo) => {
      obj[photo.id] = photo.data().decisions[userId] || 'Pending';
      return obj;
    }, {});
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateUserDecision(albumId, photoId, userId, decision) {
  try {
    await db
      .collection('albums')
      .doc(albumId)
      .collection('photos')
      .doc(photoId)
      .update({
        [`decision.${userId}`]: decision,
      });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getPhotosTaggedWithUser,
  getUserDecisionForPhoto,
  getAllUserDecisionsForAlbum,
  updateUserDecision,
};
