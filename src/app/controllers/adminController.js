const usersModel = require('../models/usersModel');
const adminModel = require('../models/adminModel');
const menfsModel = require('../models/menfashionModel')
const moment = require('moment');
const bcrypt = require('bcryptjs');
const { FALSE } = require('node-sass');

class adminController {


  restrictAD(req, res, next) {
    if (!req.session.isAD) {
      return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
    }
    next();

  }
  ////hàm để đi tới trang kiểm tra đơn hàng cho Admin
  // async showAdmin(req, res) {
  //   res.render('admin',);
  // };
  async showAdmin(req, res) {
    let AllOrder = []
    const order = await adminModel.selectAllOrder();
    //console.log(order);
    let issetHD_Admin;
    if (order != null) {
      issetHD_Admin = true;
      for (let i = 0; i < order.length; i++) {
        // console.log(value);
        AllOrder[i] = {
          listItem: await adminModel.selectCTHD(order[i].idhd),
          idhd: order[i].idhd,
          hovaten: order[i].hovaten,
          ngaylaphd: order[i].ngaylaphd,
          diachichitiet: order[i].diachichitiet,
          nhanhang: order[i].nhanhang,
          trangthai: order[i].trangthai,
          tongtien: order[i].tongtien,

        }
      }
      console.log(AllOrder);
    }
    else {
      issetHD_Admin = false;
    }
    res.render('admin', { AllOrder, issetHD_Admin });
  };


  // Show order theo filter
  async showOrderFilterByDate(req, res) {
    let AllOrderByDate = [];
    let issetHD_ByDate_Admin = false;
    if (req.body.ngay) {
      const order = await adminModel.selectOrderByDate(req.body.ngay);
      if (order != null) {
        issetHD_ByDate_Admin = true;
        for (let i = 0; i < order.length; i++) {
          // console.log(value);
          AllOrderByDate[i] = {
            listItem: await adminModel.selectCTHD(order[i].idhd),
            idhd: order[i].idhd,
            hovaten: order[i].hovaten,
            ngaylaphd: order[i].ngaylaphd,
            diachichitiet: order[i].diachichitiet,
            nhanhang: order[i].nhanhang,
            trangthai: order[i].trangthai,
            tongtien: order[i].tongtien,

          }
        }
        // console.log(AllOrderByDate);
        res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
      }
      else {
        res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
      }
    }
    else {
      res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
    }
  };

  // Ham tim hoa don theo thang
  async showOrderFilterByMonth(req, res) {
    let AllOrderByDate = [];
    let issetHD_ByDate_Admin = false;
    if (req.body.thang) {
      const monthOfYear=req.body.thang;
      console.log(monthOfYear);
      console.log(req.body.thang)
      const year = monthOfYear.slice(0,monthOfYear.indexOf("-"));
      const month = monthOfYear.slice(monthOfYear.indexOf("-")+1,monthOfYear.length);
      console.log(year);
      console.log(month);
      const order = await adminModel.selectOrderByMonth(month,year);
      // console.log(order);
      if (order != null) {
        issetHD_ByDate_Admin = true;
        for (let i = 0; i < order.length; i++) {
          // console.log(value);
          AllOrderByDate[i] = {
            listItem: await adminModel.selectCTHD(order[i].idhd),
            idhd: order[i].idhd,
            hovaten: order[i].hovaten,
            ngaylaphd: order[i].ngaylaphd,
            diachichitiet: order[i].diachichitiet,
            nhanhang: order[i].nhanhang,
            trangthai: order[i].trangthai,
            tongtien: order[i].tongtien,

          }
        }
        // console.log(AllOrderByDate);
        res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
      }
      else {
        res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
      }
    }
    else {
      res.render('admin', { AllOrder: AllOrderByDate, issetHD_Admin: issetHD_ByDate_Admin });
    }
  };






  /////////////////////////// hàm update sản phẩm

  async showUpdateProductAD(req, res) {
    const AllProduct = await menfsModel.returnProduct();
    //console.log(order);
    res.render('updateProduct', { AllProduct });
  };


  logoutAD(req, res) {
    req.session.isAD = false;
    req.session.inforAD = null;
    res.redirect(req.headers.referer);
  }

  /// hàm cập nhât trạng thái cho đơn hàng


  async updateStatus(req, res) {
    console.log(req.body);
    const kq = await adminModel.updateHD_Admin(req.body)
    res.redirect('/admin/showdashboard');
  };
  // hàm thêm sản phẩm
  async showAddproductAD(req, res) {
    //console.log(order);
    res.render('addProduct');
  };

  async updateSLProductAD(req, res) {
    //console.log(req.body);
    const kq = await adminModel.updateQuanlityProduct(req.body)
    res.redirect('/admin/updateproduct')
  };


  // hàm thêm sản phẩm
  async addProductAD(req, res) {


    const entity = {
      avata: req.body.avata,
      tensp: req.body.tensp,
      giasp: req.body.giasp,
      soluongsp: req.body.soluongsp,
    };
    // console.log(entity);
    // res.send('post');
    //console.log(entity);

    let kq1 = await adminModel.addProduct(entity);
    const rowsSP = await menfsModel.returnProduct();
    //console.log(rowsHD);
    for (var i = 0; i < req.body.mausac.length; i++) {
      const chitiethdOJ = {
        masp: rowsSP[rowsSP.length - 1].masp,
        mausac: req.body.mausac[i],
      }
      //console.log(chitiethdOJ);
      let kq2 = await adminModel.addChitietsp(chitiethdOJ);
    }
    // const resultSave = await usersModel.addAccount(entity);
    // res.redirect('/fashion/menfashion');
    res.send("da them thanh cong");
  };
  // hàm hủy hóa đơn của khách hàng
  // async deleteHD_KH(req, res) {


  //   const entity = req.body;
  //   //console.log(entity);
  //   // res.send('post');
  //   //console.log(entity);

  //   let kq = await adminModel.deleteHD(entity);
  //   res.redirect('/account/checkOrdered')
  // }



}
module.exports = new adminController();