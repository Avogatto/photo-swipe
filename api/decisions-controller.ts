const firebase = require('firebase');

const db = firebase.firestore();

export async function getUserDecisionForPhoto(albumId, photoId, userId) {
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

export async function getAllUserDecisionsForAlbum(albumId, userId) {
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

export async function updateUserDecision(albumId, photoId, userId, decision) {
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
