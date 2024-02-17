const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions');
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

router.put('/:id/downvote', verifyToken, questionsController.downvoteQuestion);
router.put('/:id/upvote', questionsController.upvoteQuestion);
router.get('/', questionsController.getAllQuestions);
router.post('/', questionsController.createQuestion);
router.post('/site-add', verifyToken, questionsController.createQuestion);
router.delete('/:id', verifyToken, questionsController.deleteQuestion);
router.put('/:id', verifyToken, questionsController.updateQuestion);
router.get('/category/:category', questionsController.getQuestionsByCategory);
router.get('/listAllCategories', questionsController.listAllCategories);

module.exports = router;
