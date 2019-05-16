const firebase = require('firebase');
const db = firebase.firestore();

function addShareToken(userEmail, shareToken) {
  const userRef = db.collection('users').doc(userEmail);
  userRef.update({
    shareTokens: firebase.firestore.FieldValue.arrayUnion(shareToken)
  }).then(() => {
    console.log('success!')
  })
  .catch(err => {
    console.error(err);
    throw err;
  });
}

function getShareTokens(userEmail) {
  db.collection('users').doc(userEmail).get()
  .then((user) => {
    return user.data().shareTokens;
  })
  .catch(err => {
    console.error(err);
    throw err;
  });
}

module.exports = { getShareTokens, addShareToken };
