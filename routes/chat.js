const express = require('express');
const router = express.Router();
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');
const chatController = require('../controllers/chatController');
const { updateLastActive } = require('../sockets/middleware/updateLastActive');

// Get chats for a user
router.get('/user/:userId', verifyToken, chatController.getUserChats);

// Get a specific chat by chatId
router.get('/:chatId', verifyToken, chatController.getChatById);

// Create a new chat
router.post('/create', verifyToken, updateLastActive, chatController.createChat);

// Send a message in a specific chat
router.post('/send/:chatId', verifyToken, chatController.sendMessage);

module.exports = router;
