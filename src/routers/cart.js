const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/cartController');

// newsController.index
router.get('/cart', cartController.showCart);

module.exports = router;