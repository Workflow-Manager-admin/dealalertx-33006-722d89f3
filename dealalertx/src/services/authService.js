'use strict';
// PUBLIC_INTERFACE
/**
 * Firebase Authentication Service
 * Verifies user token and returns decoded user.
 * (Uses firebase-admin SDK required at runtime)
 */

let admin;
try {
  admin = require('firebase-admin');
} catch (e) {
  admin = null; // placeholder if firebase-admin is not installed
}

// PUBLIC_INTERFACE
exports.verifyFirebaseToken = async (idToken) => {
  /** Verifies the Firebase auth token and returns user information */
  if (!admin) throw new Error('Firebase Admin SDK not installed');
  const decoded = await admin.auth().verifyIdToken(idToken);
  return decoded;
};
