const express = require('express');
const accountController = require('../app/controllers/accountController');
const router = express.Router();
const fashionController = require('../app/controllers/fashionController');

// newsController.index
router.get('/menfashion', fashionController.showMenfashion);
router.post('/menfashion/addFavorite', fashionController.addFavorite);
router.get('/menfashion/product/:id',fashionController.showDetailproduct);

module.exports = router;