const AppError = require('../errors/AppError');


const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Log unexpected errors
  console.error(err);

  // Return generic error for unexpected errors
  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.'
    }
  });
};

module.exports = errorHandler;