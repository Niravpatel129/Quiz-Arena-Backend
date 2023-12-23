const express = require('express');
const router = express.Router();
const leaderboardsController = require('../controllers/leaderboards');

router.get('/:category', leaderboardsController.getRankingsForCategory);
router.get('/', leaderboardsController.getAverageRatingAcrossAllCategories);

module.exports = router;
