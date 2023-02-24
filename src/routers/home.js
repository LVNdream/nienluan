const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/homeController');

// newsController.index
router.get('/', homeController.showhome);

module.exports = router;