
const favoriteModel = require('../models/listfavoriteModel');
const menfashionModel = require('../models/menfashionModel');
class listfavoriteController {


  async showlistFavorite(req, res) {
    let productFVR = [];
    const rows = await favoriteModel.returnAllFavorite();

    for (let i = 0; i < rows.length; i++) {

      const SPbyID = await menfashionModel.returnProductById(rows[i].masp);

      // console.log(SPbyID);
      productFVR[i] = {
        listMau: await menfashionModel.returnCtProduct(rows[i].masp),
        avata: SPbyID.avata,
        masp: SPbyID.masp,
        tensp: SPbyID.tensp,
        giasp: SPbyID.giasp,
        soluongsp: SPbyID.soluongsp,
      }
    }
    //  console.log(rows);
    res.render('listfavorite',
      {
        product: productFVR,
        empty: rows.length === 0
      });
  }

  //ham xoa yeu thich
  async deleteFavorite(req, res) {
    
    const iduser = res.locals.lcAuthUser.iduser;
    const masp = req.body.masp;
    // console.log(masp+'  qeqweqqe  '+iduser);
    const kqxoa = await favoriteModel.deleteFavorite(iduser, masp);
    // console.log(kqxoa);
    if (kqxoa) {
      res.redirect('/account/favorite');
    }
  }

}
module.exports = new listfavoriteController();
