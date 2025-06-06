'use strict';

// PUBLIC_INTERFACE
/**
 * Stubs for monetization hooks (Ads/Affiliate).
 * In production: fetch relevant ads, generate affiliate URLs, etc.
 */
exports.getAffiliateLink = (deal) => {
  // Return affiliate URL if available, or direct fallback
  return deal.affiliateUrl || deal.url;
};

// PUBLIC_INTERFACE
exports.getAdPayload = () => {
  // Return mock ad details (to be replaced with AdMob/partner integration)
  return {
    adNetwork: 'AdMob',
    adUnitId: 'ca-app-pub-xxxxxxx',
    creative: {
      title: 'Sponsored Deal',
      message: 'Get 10% off at Local Eatery!',
      link: 'https://admob.example.com/click?dealid=abc'
    }
  };
};
