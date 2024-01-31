const express = require('express');
const router = express.Router();
const feederController = require('../controllers/feeder');

router.get('/questions', feederController.getQuestions);

module.exports = router;
