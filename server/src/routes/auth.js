const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validateRegister, validateLogin } = require('../middleware/validation/authValidation');
const auth = require('../middleware/auth');

router.post('/users', validateRegister, AuthController.register);
router.post('/sessions', validateLogin, AuthController.login);
router.delete('/sessions/me', auth, AuthController.logout);
router.get('/users/me', auth, AuthController.getCurrentUser);

module.exports = router;