const usersModel = require('../models/usersModel');
const checkorderModel = require('../models/checkorderModel');
const menfsModel = require('../models/menfashionModel')
const moment = require('moment');
const bcrypt = require('bcryptjs');
const { FALSE } = require('node-sass');

class accountController {


  //hiển thị bảng đăng kí

  showRegisterTable(req, res) {
    res.render('accountRegister');
  }

  // Lưu thông tin đăng kí vào database
  async saveRegistered(req, res) {

    const DOBwasForamt = moment(req.body.ngaysinh, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const password_hash = bcrypt.hashSync(req.body.matkhau, 8);
    const entity = {
      //iduser:req.body.sodienthoai + 24,
      ho: req.body.ho,
      ten: req.body.ten,
      sodienthoai: req.body.sodienthoai,
      gioitinh: req.body.gioitinh,
      ngaysinh: DOBwasForamt,
      email: req.body.email,
      matkhau: password_hash,
      quyenhan: 1,
      //Quyền hạn số 1 là người dùng bth
    }
    // res.send('post');
    //console.log(entity);

    let kq = await usersModel.addAccount(entity);
    if (kq.maloi == true) {
      res.render('accountRegister', { mesage1: kq.thongbao });
    }
    else {
      res.render('accountRegister', { mesage2: kq.thongbao })
    }
    ;
    // const resultSave = await usersModel.addAccount(entity);
    // console.log(resultSave);
  }


  /// hiển thi trang đăng nhập
  showLoginTable(req, res) {
    res.render('accountLogin', { message: 'Bạn phải đăng nhập để kiểm tra đơn hàng và thay đổi mật khẩu  ' });
  }


  async logined(req, res) {
    //console.log(req.body);
    const User = await usersModel.singleByEmail(req.body.email);
    if (User === null) {
      return res.render('accountLogin', {
        error: 'Bạn đã nhập sai email hoặc mật khẩu!!!'
      });
    }

    const resultPW = bcrypt.compareSync(req.body.matkhau, User.matkhau);
    //const resultPW = bcrypt.compareSync("24102001", User.matkhau);
    if (resultPW === false) {
      return res.render('accountLogin', {
        error: 'Bạn đã nhập sai email hoặc mật khẩu!!!'
      });
    }

    if (User.quyenhan === 0) {
      delete User.matkhau;
      req.session.isAD = true;
      req.session.inforAD = User;
      //console.log(url);
      res.redirect('/admin/showdashboard')
    }
    else {
      delete User.matkhau;
      req.session.isAuthenticated = true;
      req.session.authUser = User;
      const url = req.query.retUrl || req.headers.referer;
      //console.log(url);
      res.redirect(url)
    }





    // console.log(req.body);
    // res.send('logined');
  };


  ///hàm để xác nhận coi người dùng đã đăng nhập cho rồi mới được vào kiểm tra đơn hàng
  restrict(req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
    }
    next();

  }
  ////hàm để đi tới trang kiểm tra đơn hàng
  async showcheckOrdered(req, res) {
    let ArrayProduct = []
    const order = await checkorderModel.orderByEmail(req.session.authUser.email);
    //console.log(order);
    let issetHD;
    if (order != null) {
      issetHD = true;
      for (let i = 0; i < order.length; i++) {
        // console.log(value);
        ArrayProduct[i] = {
          listItem: await checkorderModel.selectCTHD(order[i].idhd),
          idhd: order[i].idhd,
          hovaten: order[i].hovaten,
          ngaylaphd: order[i].ngaylaphd,
          diachichitiet: order[i].diachichitiet,
          nhanhang: order[i].nhanhang,
          trangthai: order[i].trangthai,
          tongtien: order[i].tongtien,

        }
      }
    }
    else {
      issetHD = false;
    }
    // console.log(order);
    //console.log(CTOrder);
    // console.log({
    //   hoadon: order, CTOrder
    // });
    //console.log(ArrayProduct);
    res.render('checkOrdered', { ArrayProduct, issetHD });
  };
  // Show danh sach yeu thich
  // async showlistfavorite(req,res){
  //   res.render('listfavorite');
  // }
  ///////////////////////////

  logout(req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
  }




  // restrictAD(req, res, next) {
  //   if (!req.session.isAD) {
  //     return res.redirect(`/account/login?retUrl=${req.originalUrl}`);
  //   }
  //   next();

  // }
  // ////hàm để đi tới trang kiểm tra đơn hàng cho Admin
  // // async showAdmin(req, res) {
  // //   res.render('admin',);
  // // };
  // async showAdmin(req, res) {
  //   let AllOrder = []
  //   const order = await checkorderModel.selectAllOrder();
  //   //console.log(order);
  //   let issetHD_Admin;
  //   if (order != null) {
  //     issetHD_Admin = true;
  //     for (let i = 0; i < order.length; i++) {
  //       // console.log(value);
  //       AllOrder[i] = {
  //         listItem: await checkorderModel.selectCTHD(order[i].idhd),
  //         idhd: order[i].idhd,
  //         hovaten: order[i].hovaten,
  //         ngaylaphd: order[i].ngaylaphd,
  //         diachichitiet: order[i].diachichitiet,
  //         nhanhang: order[i].nhanhang,
  //         trangthai: order[i].trangthai,
  //         tongtien: order[i].tongtien,

  //       }
  //     }
  //   }
  //   else {
  //     issetHD_Admin = false;
  //   }
  //   res.render('admin', { AllOrder, issetHD_Admin });
  // };
  // /////////////////////////// hàm update sản phẩm

  // async showUpdateProductAD(req, res) {
  //   const AllProduct = await menfsModel.returnProduct();
  //   //console.log(order);
  //   res.render('updateProduct', { AllProduct });
  // };


  // logoutAD(req, res) {
  //   req.session.isAD = false;
  //   req.session.inforAD = null;
  //   res.redirect(req.headers.referer);
  // }

  // /// hàm cập nhât trạng thái cho đơn hàng


  // async updateStatus(req, res) {
  //   console.log(req.body);
  //   const kq = await checkorderModel.updateHD_Admin(req.body)
  //   res.redirect('/account/admin/showdashboard')
  // };
  // // hàm thêm sản phẩm
  // async showAddproductAD(req, res) {
  //   //console.log(order);
  //   res.render('addProduct');
  // };

  // async updateSLProductAD(req, res) {
  //   //console.log(req.body);
  //   const kq = await checkorderModel.updateQuanlityProduct(req.body)
  //   res.redirect('/account/admin/updateproduct')
  // };


  // // hàm thêm sản phẩm
  // async addProductAD(req, res) {


  //   const entity = req.body;
  //   //console.log(entity);
  //   // res.send('post');
  //   //console.log(entity);

  //   let kq = await checkorderModel.addProduct(entity);
  //   // const resultSave = await usersModel.addAccount(entity);
  //   res.redirect('/fashion/menfashion')
  // };
  // // hàm hủy hóa đơn của khách hàng
  async deleteHD_KH(req, res) {


    const entity = req.body;
    //console.log(entity);
    // res.send('post');
    //console.log(entity);

    let kq = await checkorderModel.deleteHD(entity);
    res.redirect('/account/checkOrdered')
  }

}

module.exports = new accountController();