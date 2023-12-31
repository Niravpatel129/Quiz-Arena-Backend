const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepage');

router.get('/list', homepageController.getQuestionList);
router.get('/config', homepageController.getConfig);

module.exports = router;
