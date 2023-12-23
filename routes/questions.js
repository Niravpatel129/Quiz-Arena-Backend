const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questions');

router.get('/', questionsController.getAllQuestions);
router.post('/', questionsController.createQuestion);
router.delete('/:id', questionsController.deleteQuestion);
router.put('/:id', questionsController.updateQuestion);

module.exports = router;
