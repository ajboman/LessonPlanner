const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteOldAnonUsers = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const usersRef = admin.firestore().collection('users');
  const oneDayAgo = admin.firestore.Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000));

  const oldAnonUsersSnapshot = await usersRef
    .where('dateCreated', '<=', oneDayAgo)
    .where('type', '==', 'anonymous')
    .get();

  const deletePromises = [];
  oldAnonUsersSnapshot.forEach((doc) => {
    // Deleting the document will automatically trigger deleteUserInAuth
    deletePromises.push(doc.ref.delete());
  });

  await Promise.all(deletePromises);

  console.log(`Deleted ${deletePromises.length} old anonymous user(s).`);

  return null;
});

exports.deleteUserInAuth = functions.firestore.document('users/{userId}').onDelete((snap, context) => {
  const userId = context.params.userId;

  return admin.auth().deleteUser(userId)
    .then(() => console.log(`Deleted user ${userId} from Firebase Auth.`))
    .catch((error) => console.error(`Failed to delete user ${userId} from Firebase Auth: `, error));
});
