'use strict';
const notificationService = require('../services/notificationService');

/**
 * Controller for sending push notifications (manual/admin only)
 */
class NotificationController {
  // PUBLIC_INTERFACE
  async sendTestNotification(req, res) {
    // For development/testing purposes
    try {
      const { token, title, body } = req.body;
      if (!token) return res.status(400).json({ message: 'Missing FCM token' });
      await notificationService.sendPushNotification(token, { title: title || 'DealAlertX', body: body || 'This is a test notification' });
      res.json({ message: 'Notification sent' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new NotificationController();
