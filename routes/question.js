const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions');

router.put('/:id/downvote', questionsController.downvoteQuestion);
router.put('/:id/upvote', questionsController.upvoteQuestion);
router.get('/', questionsController.getAllQuestions);
router.post('/', questionsController.createQuestion);
router.delete('/:id', questionsController.deleteQuestion);
router.put('/:id', questionsController.updateQuestion);
router.get('/category/:category', questionsController.getQuestionsByCategory);
router.get('listAllCategories', questionsController.listAllCategories);

module.exports = router;
