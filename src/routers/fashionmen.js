const express = require('express');
const accountController = require('../app/controllers/accountController');
const router = express.Router();
const fashionController = require('../app/controllers/fashionController');
// thêm vào thư viện multer dể lưu hình ảnh
var multer = require('multer');


var storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, './src/public/img/uploaded');
  },
  filename: (req, file, res) => {
    res(null, Date.now() +'-'+file.originalname);
  }
});
var upload = multer({ storage: storage }); 


// newsController.index
router.get('/menfashion', fashionController.showMenfashion);
router.post('/menfashion/addFavorite', fashionController.addFavorite);
router.get('/menfashion/product/:id', fashionController.showDetailproduct);
router.post('/menfashion/product/:id',upload.any(),fashionController.upfile);

module.exports = router;