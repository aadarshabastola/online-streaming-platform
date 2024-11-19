const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/GenreController');

router.get('/', GenreController.list);

module.exports = router;