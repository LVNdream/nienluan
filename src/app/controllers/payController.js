
const payModel = require('../models/payModel');

class payController {
  showpay(req, res) {
    res.render('pay');

  }
  async addPayInDB(req, res) {

    const entityhd = {
      //idhd: req.body.sodienthoai + 24,
      hovaten: req.body.hovaten,
      email: req.body.email,
      sodienthoai: req.body.sodienthoai,
      nhanhang: req.body.nhanhang,
      diachichitiet: req.body.diachichitiet,
      tinh: req.body.tinh,
      quan: req.body.quan,
      phuong: req.body.phuong,
      thanhtoan: req.body.thanhtoan,
      ghichu: req.body.ghichu,
      tongtien: req.body.tongtien,
      trangthai:'Chờ xác nhận'
    }
    //console.log(entity);
    await payModel.addPay(entityhd);
    //console.log(req.body);
    // thêm chitiethd
    const rowsHD = await payModel.returnPay();
    //console.log(rowsHD);
    for (var i = 0; i < req.body.masp.length; i++) {
      const chitiethdOJ = {
        idhd: rowsHD[rowsHD.length - 1].idhd,
        masp: req.body.masp[i],
        soluong: req.body.soluong[i],
        size: req.body.size[i],
      }
      //console.log(chitiethdOJ);
      await payModel.addChitiethd(chitiethdOJ);
    }
    // res.send('123');
    res.render('pay', {
      announce: 'đã luu đơn hàng',
    });
  }

}
module.exports = new payController();