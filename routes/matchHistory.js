const express = require('express');
const router = express.Router();
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');
const matchHistoryController = require('../controllers/matchHistory');

router.get('/', verifyToken, matchHistoryController.getMatchHistoryForUser);

module.exports = router;
