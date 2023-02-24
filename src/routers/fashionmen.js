const express = require('express');
const router = express.Router();
const fashionController = require('../app/controllers/fashionController');

// newsController.index
router.get('/menfashion', fashionController.showMenfashion);

module.exports = router;