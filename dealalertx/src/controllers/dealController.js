'use strict';
const dealService = require('../services/dealService');

/**
 * Controller for deal-related endpoints (finding, submitting, timing, etc.)
 */
class DealController {
  // PUBLIC_INTERFACE
  async getNearbyDeals(req, res) {
    /**
     * Returns location-based deals.
     * Query: lat, lng, radius (km)
     */
    try {
      const { lat, lng, radius } = req.query;
      if (!lat || !lng) {
        return res.status(400).json({ message: 'Missing lat/lng in query.' });
      }
      const deals = await dealService.findNearbyDeals({ lat: parseFloat(lat), lng: parseFloat(lng), radius: parseFloat(radius) || 5 });
      res.json({ deals });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async getDeal(req, res) {
    /**
     * Returns details for a single deal, including countdown timer.
     */
    try {
      const deal = await dealService.getDealById(req.params.id);
      if (!deal) return res.status(404).json({ message: 'Deal not found' });
      res.json({ deal });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async submitDeal(req, res) {
    /**
     * Allows authenticated users to submit a deal
     */
    try {
      const dealData = req.body;
      dealData.user = req.user.uid;
      const created = await dealService.submitUserDeal(dealData);
      res.status(201).json({ deal: created });
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  }

  // PUBLIC_INTERFACE
  async listExternalDeals(req, res) {
    /**
     * Aggregates deals from public APIs (stubs for Yelp, RetailMeNot, etc)
     */
    try {
      const { lat, lng } = req.query;
      const deals = await dealService.getExternalDeals({ lat, lng });
      res.json({ deals });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new DealController();
