
const menfashionModel = require('../models/menfashionModel');
const menfsModel = require('../models/menfashionModel');
const accountController = require('../controllers/accountController');


class fashionController {


  async showMenfashion(req, res) {
    //const rowPDCT = await menfsModel.returnProduct();

    let productCT = [];
    const rows = await menfsModel.returnProduct();
    let rowFVR = [];
    // console.log(res.locals.lcAuthUser,'sadadsas')
    if (res.locals.lcIsAuthenticated) {
      rowFVR = await menfsModel.returnAllFavorite();
      // console.log(rowFVR);
    }

    for (let i = 0; i < rows.length; i++) {
      let index = null;
      // them so yeu thich
      if (rowFVR != null) {
        for (let j = 0; j < rowFVR.length; j++) {
          if (rowFVR[j].masp == rows[i].masp && res.locals.lcAuthUser.iduser == rowFVR[j].iduser) {
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

  // Show cac san pham duoc tim kiem
  async showSearchMenfashion(req, res) {
    //const rowPDCT = await menfsModel.returnProduct();

    let serachProductCT = [];
    if (req.query.tensp) {
      const rows = await menfsModel.returnProductByName(req.query.tensp);
      if (rows.length != 0) {
        let searchRowFVR = [];
        // console.log(res.locals.lcAuthUser,'sadadsas')
        if (res.locals.lcIsAuthenticated) {
          searchRowFVR = await menfsModel.returnAllFavorite();
          // console.log(searchRowFVR);
        }

        for (let i = 0; i < rows.length; i++) {
          let index = null;
          // them so yeu thich
          if (searchRowFVR != null) {
            for (let j = 0; j < searchRowFVR.length; j++) {
              if (searchRowFVR[j].masp == rows[i].masp && res.locals.lcAuthUser.iduser == searchRowFVR[j].iduser) {
                index = 1;
              }
            }
          }
          // console.log(index);
          serachProductCT[i] = {
            listMau: await menfashionModel.returnCtProduct(rows[i].masp),
            avata: rows[i].avata,
            masp: rows[i].masp,
            tensp: rows[i].tensp,
            giasp: rows[i].giasp,
            soluongsp: rows[i].soluongsp,
            favorite: index,
          }
        }
        // console.log(serachProductCT);
        res.render('menfashion',
          {
            product: serachProductCT,
            empty: rows.length === 0
          });
      }
      else {
        res.render('menfashion',
          {
            product: serachProductCT,
            empty: rows.length === 0
          });
      }
    }

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
        if (element.masp == req.body.masp && element.iduser == res.locals.lcAuthUser.iduser) {
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
    let emptyNX = false;
    let arrayCTNX = [];
    let ctsp;
    const masp = req.params.id;
    const sanpham = await menfsModel.returnProductById(masp);
    const arrayNX = await menfashionModel.returnNX_by_masp(masp);
    // console.log(arrayNX);
    // Lấy commnet từ khách
    if (arrayNX.length > 0) {
      emptyNX = true;
      for (let index = 0; index < arrayNX.length; index++) {
        // console.log(entity);
        arrayCTNX[index] = {
          ho: arrayNX[index].ho,
          ten: arrayNX[index].ten,
          content: arrayNX[index].content,
          img: await menfashionModel.returnIMG_By_idcontent(arrayNX[index].idcontent),
        }
      }
    }



    // lấy chi tiết sản phẩm
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
        ctnx: arrayCTNX,
        emptyNX: emptyNX,
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
  async upfile(req, res) {
    let iduser;
    let ho;
    let ten;
    if (req.session.isAuthenticated) {
      iduser = res.locals.lcAuthUser.iduser;
      ho = res.locals.lcAuthUser.ho;
      ten = res.locals.lcAuthUser.ten;

    }
    if (req.session.isAD) {
      iduser = res.locals.lcinforAD.iduser;
      ho = res.locals.lcinforAD.ho;
      ten = res.locals.lcinforAD.ten;
    }
    const entityNX = {
      iduser: iduser,
      masp: req.body.masp,
      ten: ten,
      ho: ho,
      content: req.body.content,
    }
    const addNX = await menfashionModel.addNhanxet(entityNX);
    const arrayNX = await menfashionModel.returnNX();
    let idcontent = arrayNX[arrayNX.length - 1].idcontent
    const arrayImg = req.files;
    // console.log(req.files.length)
    // console.log(entityNX);
    // console.log(addNX);
    if (arrayImg.length > 0) {
      for (let index = 0; index < arrayImg.length; index++) {
        const entity = {
          idcontent: idcontent,
          namepicture: arrayImg[index].filename

        }
        const addImg = await menfashionModel.addNXpicture(entity);
      }
    }
    if (addNX) {
      return res.redirect(`${req.originalUrl}`);
    }
  }

}
module.exports = new fashionController();
