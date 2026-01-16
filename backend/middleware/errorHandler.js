// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error status and message
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // PostgreSQL specific errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        return res.status(409).json({ error: 'Duplicate entry found' });
      case '23503': // Foreign key violation
        return res.status(400).json({ error: 'Referenced record not found' });
      case '23502': // Not null violation
        return res.status(400).json({ error: 'Required field is missing' });
      case '22P02': // Invalid text representation
        return res.status(400).json({ error: 'Invalid data format' });
      case '23514': // Check constraint violation
        return res.status(400).json({ error: 'Invalid value provided' });
      default:
        return res.status(500).json({ error: 'Database error occurred' });
    }
  }

  // Send error response
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
