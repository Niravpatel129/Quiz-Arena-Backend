const express = require('express');
const router = express.Router();

// Mount the route modules
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/question', require('./questions'));
router.use('/leaderboards', require('./leaderboards'));

// Exporting the base router
module.exports = router;
