const express = require('express');
const router = express.Router();

// Importing route modules

// Mount the route modules
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/question', require('./questions'));
// router.use('/categories', categoryRoutes);

// Exporting the base router
module.exports = router;
