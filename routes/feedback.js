const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback');
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

router.get('/current-question', feedbackController.getCurrentQuestion);
router.post('/submit-feedback', verifyToken, feedbackController.submitFeedback);

module.exports = router;
