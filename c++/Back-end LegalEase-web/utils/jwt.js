const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a secure random secret (can be used if you want to rotate secrets programmatically)
const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Create JWT token
const generateToken = (payload, expiresIn = '30d') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Decode token without verification (for checking expiration)
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateSecret,
  verifyToken,
  generateToken,
  decodeToken
};