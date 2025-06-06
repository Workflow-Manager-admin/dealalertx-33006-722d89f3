'use strict';
// Simulated database (should use real DB for production)
const deals = [];
const externalDealsCache = [];

// Utility: Haversine distance (km)
function calcDistance(lat1, lon1, lat2, lon2) {
  const toRad = v => v * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// PUBLIC_INTERFACE
exports.findNearbyDeals = async ({ lat, lng, radius }) => {
  /**
   * Returns deals within radius (km) from lat/lng.
   * Query both local and external deals.
   */
  // Merge internal deals and externalDealsCache
  const now = Date.now();
  const allDeals = [...deals, ...externalDealsCache];
  return allDeals
    .filter(d =>
      d.lat && d.lng && calcDistance(lat, lng, d.lat, d.lng) <= radius &&
      (new Date(d.endTime).getTime() > now)
    );
};

// PUBLIC_INTERFACE
exports.getDealById = async (id) => {
  const all = [...deals, ...externalDealsCache];
  return all.find(d => d.id === id);
};

// PUBLIC_INTERFACE
exports.submitUserDeal = async (dealData) => {
  // Validate and create a new deal posted by a user; normally validate thoroughly.
  if (!dealData.title || !dealData.lat || !dealData.lng || !dealData.endTime) throw new Error('Invalid deal details');
  const newDeal = {
    ...dealData,
    id: 'user_' + Date.now(),
    created: new Date().toISOString(),
    verified: false,
    source: 'user',
  };
  deals.push(newDeal);
  return newDeal;
};

// PUBLIC_INTERFACE
exports.getExternalDeals = async ({ lat, lng }) => {
  // Simulate querying Yelp/RetailMeNot etc (stubbed)
  // Should use API keys securely, and deduplicate deals
  const examples = [
    {
      id: 'external_1',
      title: 'Flash Sale at Pizza Planet',
      lat: lat || 37.7749,
      lng: lng || -122.4194,
      startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      url: 'https://yelp.com/biz/pizza-planet',
      affiliateUrl: 'https://amazon.com/deal?id=promotion123', // For monetization
      source: 'yelp',
      verified: true
    }
  ];
  externalDealsCache.length = 0;
  externalDealsCache.push(...examples);
  return externalDealsCache;
};
