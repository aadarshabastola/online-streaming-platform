const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const contentRoutes = require('./content');
const genreRoutes = require('./genres');

// Mount routes
router.use('/api', authRoutes);
router.use('/api/contents', contentRoutes);
router.use('/api/genres', genreRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = router;