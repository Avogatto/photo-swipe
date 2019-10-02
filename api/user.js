const firebase = require('firebase');
const db = firebase.firestore();

async function addShareToken(userEmail, shareToken) {
  try {
    const user = await db
      .collection('users')
      .doc(userEmail)
      .set(
        {
          shareTokens: firebase.firestore.FieldValue.arrayUnion(shareToken),
        },
        { merge: true } // If the doc already exists, this will merge the new data with any existing document.
      );
    console.log(
      `Successfully updated shareTokens = ${JSON.stringify(user, null, 1)}`
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getSharedUsers(albumId) {
  try {
    const { docs } = await db
      .collection('users')
      .where('sharedAlbums', 'array-contains', albumId)
      .get();
    const results = docs.map(doc => {
      return doc.id;
    });
    console.log(
      `Successfully retrieved sharedUsers = ${JSON.stringify(results, null, 1)}`
    );
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getShareTokens(userEmail) {
  try {
    const user = await db
      .collection('users')
      .doc(userEmail)
      .get();
    if (!user.exists) {
      if (!user.exists) {
        const err = new Error('User does not exist!');
        console.error(err);
        throw err;
      }
      const results = user.data().shareTokens || [];
      console.log(
        `Successfully retrieved shareTokens = ${JSON.stringify(
          results,
          null,
          1
        )}`
      );
      return results;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getAuthorizedUsers() {
  try {
    const { docs } = await db
      .collection('users')
      .where('authorized', '==', true)
      .get();
    const results = docs.map(doc => {
      const { fullName } = doc.data();
      return { userEmail: doc.id, fullName };
    });
    console.log(
      `Successfully retreived authorizedUsers = ${JSON.stringify(
        results,
        null,
        1
      )}`
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error('Could not retrieve list of authorized users.');
  }
}

async function addAuthorizedUser(userEmail, fullName, admin) {
  try {
    const user = await db
      .collection('users')
      .doc(userEmail)
      .set(
        {
          authorized: true,
          fullName,
          admin,
        },
        { merge: true }
      );
    console.log(
      `Successfully added authorizedUser = ${JSON.stringify(user, null, 1)}`
    );
  } catch (err) {
    console.error(err);
    throw new Error('Could not add authorized user.');
  }
}

async function addTaggedAlbum(userEmail, albumId) {
  try {
    await db
      .collection('users')
      .doc(userEmail)
      .set(
        {
          taggedAlbums: firebase.firestore.FieldValue.arrayUnion(albumId),
        },
        { merge: true } // If the doc already exists, this will merge the new data with any existing document.
      );
    console.debug('Successfully updated taggedAlbums.');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getShareTokens,
  addShareToken,
  getAuthorizedUsers,
  addAuthorizedUser,
  addTaggedAlbum,
  getSharedUsers,
};
