const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/showdashboard', adminController.restrictAD,adminController.showAdmin);
///////////////////// đơn hàng
router.post('/logoutAD', adminController.restrictAD,adminController.logoutAD);
router.post('/showdashboard/updateStatus', adminController.restrictAD,adminController.updateStatus);
////CRUD product
router.get('/updateproduct', adminController.restrictAD,adminController.showUpdateProductAD);
router.get('/addproduct', adminController.restrictAD,adminController.showAddproductAD);
///POST để cập nhật
router.post('/showdashboard/updateProduct', adminController.restrictAD,adminController.updateSLProductAD);
router.post('/showdashboard/addProduct', adminController.restrictAD,adminController.addProductAD);
///hàm để khách hàng xóa đơn hàng khách hàng
//router.post('/checkOrdered/deleteHD', adminController.restrict,adminController.deleteHD_KH);

module.exports = router;