const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/ContentController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', ContentController.list);
router.get('/:id', ContentController.getDetails);

// Protected routes
router.get('/:id/stream', auth, (req, res) => {
  const { id } = req.params;
  // Just return the video URL instead of streaming
  res.json({ url: `${process.env.MEDIA_BASE_URL}/videos/${id}` });
});

module.exports = router;