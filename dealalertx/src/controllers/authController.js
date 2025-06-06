'use strict';
const authService = require('../services/authService');

// PUBLIC_INTERFACE
exports.verifyToken = async (req, res, next) => {
  /** Verifies Firebase auth token, attaches decoded user to req.user */
  const idToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (!idToken) {
    return res.status(401).json({ message: 'Missing Authorization token' });
  }
  try {
    const decodedUser = await authService.verifyFirebaseToken(idToken);
    req.user = decodedUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
