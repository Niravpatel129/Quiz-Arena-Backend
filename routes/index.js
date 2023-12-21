const express = require('express');
const router = express.Router();

// Importing route modules
const userRoutes = require('./users');
const questionRoutes = require('./questions');
const categoryRoutes = require('./categories');

// Mount the route modules
router.use('/users', userRoutes);
// router.use('/questions', questionRoutes);
// router.use('/categories', categoryRoutes);

// Exporting the base router
module.exports = router;
