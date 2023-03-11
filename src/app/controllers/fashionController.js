
const menfashionModel = require('../models/menfashionModel');
const menfsModel = require('../models/menfashionModel');
const accountController = require('../controllers/accountController');


class fashionController {


  async showMenfashion(req, res) {
    //const rowPDCT = await menfsModel.returnProduct();

    let productCT = [];
    const rows = await menfsModel.returnProduct();
    let rowFVR = [];
    if (res.locals.lcIsAuthenticated) {
      rowFVR = await menfsModel.returnAllFavorite();
      // console.log(rowFVR);
    }

    for (let i = 0; i < rows.length; i++) {
      let index = null;
      // them so yeu thich
      if (rowFVR != null) {
        for (let j = 0; j < rowFVR.length; j++) {
          if (rowFVR[j].masp == rows[i].masp) {
            index = 1;
          }
        }
      }
      // console.log(index);
      productCT[i] = {
        listMau: await menfashionModel.returnCtProduct(rows[i].masp),
        avata: rows[i].avata,
        masp: rows[i].masp,
        tensp: rows[i].tensp,
        giasp: rows[i].giasp,
        soluongsp: rows[i].soluongsp,
        favorite: index,
      }
    }
    // console.log(productCT);
    res.render('menfashion',
      {
        product: productCT,
        empty: rows.length === 0
      });
  }


  // showMenfashion(req, res) {
  //   // const rows = await db.load('SELECT * from product');
  //   res.render('menfashion');
  // }

  // hàm thêm vào yêu thích
  async addFavorite(req, res) {
    let isExsit = 0;
    if (!req.session.isAuthenticated) {
      return res.send(`/account/login`);
    }
    else {

      const listfavorite = await menfsModel.returnAllFavorite();

      listfavorite.forEach(element => {
        if (element.masp == req.body.masp) {
          isExsit = 1;
          console.log('da trung')
          return isExsit;
        }
      });
      if (isExsit == 0) {
        const entity = {
          iduser: res.locals.lcAuthUser.iduser,
          masp: req.body.masp,
          favorite: true,
        }
        const addFVR = await menfsModel.addFavorite(entity);
        res.send('/fashion/menfashion');
      }
    }
  }

  // ham tra ve san pham chi tiet
  async showDetailproduct(req, res) {
    let emptyCTSP = false;
    let ctsp;
    const masp = req.params.id;
    const sanpham = await menfsModel.returnProductById(masp);
    if (sanpham) {
      emptyCTSP = true;
      ctsp = {
        listMau: await menfashionModel.returnCtProduct(sanpham.masp),
        avata: sanpham.avata,
        masp: sanpham.masp,
        tensp: sanpham.tensp,
        giasp: sanpham.giasp,
        soluongsp: sanpham.soluongsp,
      };
      // console.log(emptyCTSP);
      // console.log(ctsp);
      res.render('detailProduct', {
        ctproduct: ctsp,
        empty: emptyCTSP,
      });
    }
    else {
      // console.log(emptyCTSP);
      return res.redirect(`/fashion/menfashion?retUrl=${req.originalUrl}`);
    }

  }

  //tạo hàm lưu file vào server
  // UpLoadFile() {

  //     return upload.single('file')
  //   }



  // upfile
  upfile(req, res) {
    console.log(req.files);
    const picture = req.files;
    res.render('test', { listpicture: picture })
    // res.send(req.files[0].path)
  }

}
module.exports = new fashionController();
