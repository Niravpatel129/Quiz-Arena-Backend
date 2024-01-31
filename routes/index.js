const express = require('express');
const router = express.Router();

// Mount the route modules
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/question', require('./question'));
router.use('/leaderboards', require('./leaderboards'));
router.use('/matchHistory', require('./matchHistory'));
router.use('/chat', require('./chat'));
router.use('/homepage', require('./homepage'));
router.use('/notifications', require('./notifications'));
router.use('/feeder', require('./feeder'));

// Exporting the base router
module.exports = router;
