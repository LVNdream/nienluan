const express = require('express');
const router = express.Router();
const payController = require('../app/controllers/payController');

// newsController.index
router.get('/pay', payController.showpay);
router.post('/pay', payController.addPayInDB);

module.exports = router;