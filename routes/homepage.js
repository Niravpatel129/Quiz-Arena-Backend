const express = require('express');
const router = express.Router();
const { verifyToken } = require('../sockets/middleware/jwtMiddleware');

const homepageController = require('../controllers/homepage');

router.get('/list', homepageController.getQuestionList);
router.get('/home', verifyToken, homepageController.getHomepage);
router.get('/config', homepageController.getConfig);
router.get('/config/:version', homepageController.getConfig);

module.exports = router;
