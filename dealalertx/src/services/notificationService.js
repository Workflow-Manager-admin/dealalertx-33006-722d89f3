'use strict';

// PUBLIC_INTERFACE
/**
 * Integrates with Firebase Cloud Messaging
 * Sends push notifications to device tokens
 * (Assumes firebase-admin initialized elsewhere with FCM credentials)
 */
let admin;
try {
  admin = require('firebase-admin');
} catch (e) {
  admin = null;
}

/**
 * 
 * @param {string} token FCM device token
 * @param {{title: string, body: string}} notification Payload
 */
exports.sendPushNotification = async (token, notification) => {
  if (!admin) throw new Error('Firebase Admin SDK not installed');
  await admin.messaging().send({
    token,
    notification
  });
  return true;
};
