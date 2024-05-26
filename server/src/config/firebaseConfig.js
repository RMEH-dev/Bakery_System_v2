// firebaseConfig.js
const admin = require('firebase-admin');

const serviceAccount = require('../../../server/perera-bakers-firebase-adminsdk-m8d8p-1f71cafd4e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'perera-bakers.appspot.com' // Replace with your Firebase storage bucket URL
});

const bucket = admin.storage().bucket();

module.exports = bucket;
