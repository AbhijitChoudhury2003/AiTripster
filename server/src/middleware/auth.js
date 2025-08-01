const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

// Simple middleware to protect routes - Easy to understand
const authenticateUser = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);

    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is invalid'
      });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is invalid',
      error: error.message
    });
  }
};

module.exports = authenticateUser;
