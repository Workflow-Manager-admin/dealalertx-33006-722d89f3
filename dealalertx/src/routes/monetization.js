const express = require('express');
const router = express.Router();
const monetizationService = require('../services/monetizationService');

// Get an ad payload (to be displayed in-app)
router.get('/ad', (req, res) => {
  const ad = monetizationService.getAdPayload();
  res.json(ad);
});

// Get affiliate link for a deal
router.get('/affiliate', (req, res) => {
  const dealUrl = req.query.url;
  if (!dealUrl) return res.status(400).json({ message: 'Missing deal url' });
  // Would normally look up deal/affiliate info; here, echo as stub.
  res.json({ affiliate: dealUrl });
});

module.exports = router;
