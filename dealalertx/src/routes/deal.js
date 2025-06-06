const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');
const authController = require('../controllers/authController');

/**
 * /api/deals
 */

// Get nearby deals (location-based, public)
router.get('/nearby', dealController.getNearbyDeals.bind(dealController));

// Get specific deal (public)
router.get('/:id', dealController.getDeal.bind(dealController));

// List external deals from aggregation sources (public)
router.get('/external/list', dealController.listExternalDeals.bind(dealController));

// Submit new deal (protected)
router.post('/submit', authController.verifyToken, dealController.submitDeal.bind(dealController));

module.exports = router;
