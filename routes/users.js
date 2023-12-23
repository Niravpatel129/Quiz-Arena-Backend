const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

router.get('/', userController.getAllUsers);
router.get('/friends', verifyToken, userController.getFriends);
router.post('/', userController.createUser);
router.post('/addFriend', verifyToken, userController.addFriend);

module.exports = router;
