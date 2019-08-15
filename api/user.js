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

function getShareTokens(userEmail) {
  db.collection('users')
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
    const results = await db
      .collection('users')
      .where('authorized', '==', true)
      .get();
    return results.map(doc => {
      return { email: doc.id, name: doc.name };
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

module.exports = {
  getShareTokens,
  addShareToken,
  getAuthorizedUsers,
  addAuthorizedUser,
};
