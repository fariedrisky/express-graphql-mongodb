const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');

const authenticate = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new Error('Authentication failed');
  }
};

module.exports = { authenticate };
