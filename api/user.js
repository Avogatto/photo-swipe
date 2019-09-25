const firebase = require('firebase');
const db = firebase.firestore();

function addShareToken(userEmail, shareToken) {
  const userRef = db.collection('users').doc(userEmail);
  userRef
    .set(
      {
        shareTokens: firebase.firestore.FieldValue.arrayUnion(shareToken),
      },
      { merge: true }
    )
    .then(() => {
      // If the doc already exists, this will merge the new data with any existing document.
      console.log('success!');
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

async function getSharedUsers(albumId) {
  const usersRef = db.collection('users');
  try {
    const snapshot = usersRef.where('sharedAlbums', 'array-contains', albumId);
    if (snapshot.empty) {
      console.log('no matching documents.');
      return [];
    }

    const sharedUsers = snapshot.map((doc) => {
      return doc.id;
    })

    return sharedUsers;
  } catch (err) {
    console.error(err);
    throw err;
  };
}

function getShareTokens(userEmail) {
  return db
    .collection('users')
    .doc(userEmail)
    .get()
    .then(user => {
      if (!user.exists) {
        const err = new Error('User does not exist!');
        console.error(err);
        throw err;
      }
      return user.data().shareTokens || [];
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

async function getAuthorizedUsers() {
  try {
    const { docs } = await db
      .collection('users')
      .where('authorized', '==', true)
      .get();
    return docs.map(doc => {
      const { fullName } = doc.data();
      return { userEmail: doc.id, fullName };
    });
  } catch (err) {
    console.error(err);
    throw new Error('Could not retrieve list of authorized users.');
  }
}

async function addAuthorizedUser(userEmail, fullName, admin) {
  try {
    await db
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
    console.log('success!');
  } catch (err) {
    console.error(err);
    throw new Error('Could not add authorized user.');
  }
}

function addSharedAlbum(userEmail, albumId) {
  const userRef = db.collection('users').doc(userEmail);
  userRef
    .set(
      {
        sharedAlbums: firebase.firestore.FieldValue.arrayUnion(albumId),
      },
      { merge: true }
    )
    .then(() => {
      // If the doc already exists, this will merge the new data with any existing document.
      console.log('success!');
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

module.exports = {
  getShareTokens,
  addShareToken,
  getAuthorizedUsers,
  addAuthorizedUser,
  addSharedAlbum,
  getSharedUsers;
};
