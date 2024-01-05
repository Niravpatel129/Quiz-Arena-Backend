const express = require('express');
const router = express.Router();
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');
const notificationsController = require('../controllers/notifications');

router.post('/register', verifyToken, notificationsController.register);

module.exports = router;
