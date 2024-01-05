const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

router.post(
  '/register',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  authController.register,
);

router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').exists(),
  ],
  authController.login,
);

router.get('/logout', authController.logout);

router.get('/validate-token', verifyToken, authController.validateToken);

router.post('/apple', authController.appleLogin);

router.post('/facebook', authController.facebookLogin);

module.exports = router;
