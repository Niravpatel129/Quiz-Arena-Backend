const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');

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

router.post('/apple', authController.appleLogin);

module.exports = router;
