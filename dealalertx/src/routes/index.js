const express = require('express');
const healthController = require('../controllers/health');

const router = express.Router();

// Health endpoint
router.get('/', healthController.check.bind(healthController));

// Mount main API routes
router.use('/api/deals', require('./deal'));
router.use('/api/notifications', require('./notification'));
router.use('/api/monetization', require('./monetization'));

module.exports = router;
