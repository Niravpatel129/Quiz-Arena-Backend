const express = require('express');
const router = express.Router();
const feederController = require('../controllers/feeder');
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

router.get('/questions', feederController.getQuestions);
router.post('/user-answers', verifyToken, feederController.addUserAnswersBatch);

module.exports = router;
