const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

// Send a test push notification (protected for admin/dev use)
router.post('/send', authController.verifyToken, notificationController.sendTestNotification.bind(notificationController));

module.exports = router;
