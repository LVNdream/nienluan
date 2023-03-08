const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/accountController');
const favoriteController = require('../app/controllers/listfavoriteController')

// newsController.index

//để tạo tài khoản
router.get('/register', accountController.showRegisterTable);
router.post('/register', accountController.saveRegistered);
// để đăng nhập tài khoản
router.get('/login', accountController.showLoginTable);
router.post('/login', accountController.logined);
//trang kiểm tra đơn hàng
router.get('/checkOrdered', accountController.restrict,accountController.showcheckOrdered);
router.get('/favorite', accountController.restrict,favoriteController.showlistFavorite);
router.post('/favorite/deleteId', accountController.restrict,favoriteController.deleteFavorite);
/////////////////////
router.post('/logout', accountController.restrict,accountController.logout);



// router.get('/admin/showdashboard', accountController.restrictAD,accountController.showAdmin);
// ///////////////////// đơn hàng
// router.post('/admin/logoutAD', accountController.restrictAD,accountController.logoutAD);
// router.post('/admin/showdashboard/updateStatus', accountController.restrictAD,accountController.updateStatus);
// ////CRUD product
// router.get('/admin/updateproduct', accountController.restrictAD,accountController.showUpdateProductAD);
// router.get('/admin/addproduct', accountController.restrictAD,accountController.showAddproductAD);
// ///POST để cập nhật
// router.post('/admin/showdashboard/updateProduct', accountController.restrictAD,accountController.updateSLProductAD);
// router.post('/admin/showdashboard/addProduct', accountController.restrictAD,accountController.addProductAD);
// ///hàm để khách hàng xóa đơn hàng khách hàng
router.post('/checkOrdered/deleteHD', accountController.restrict,accountController.deleteHD_KH);






module.exports = router;