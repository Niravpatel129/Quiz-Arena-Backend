const express = require('express');
const router = express.Router();
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');
const leaderboardsController = require('../controllers/leaderboards');

router.get('/global', verifyToken, leaderboardsController.getLeaderboardsGlobal);
router.get('/friends', verifyToken, leaderboardsController.getLeaderboardsFriends);
router.get('/', leaderboardsController.getAverageRatingAcrossAllCategories);
router.get('/:category', leaderboardsController.getRankingsForCategory);

module.exports = router;
