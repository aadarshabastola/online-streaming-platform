const jwt = require('jsonwebtoken');
const knex = require('../../db/knex');
const AppError = require('../errors/AppError');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(
        'AUTH_REQUIRED',
        'Authentication is required to access this resource.',
        401
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Check if token exists and is valid in sessions table
    const session = await knex('sessions')
      .where({ token, is_valid: true })
      .where('expires_at', '>', new Date())
      .first();

    if (!session) {
      throw new AppError(
        'AUTH_INVALID_TOKEN',
        'Invalid or expired authentication token.',
        401
      );
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user and token to request
    req.user = { id: decoded.userId };
    req.token = token;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError(
        'AUTH_INVALID_TOKEN',
        'Invalid or expired authentication token.',
        401
      ));
    } else {
      next(error);
    }
  }
};

module.exports = authMiddleware;