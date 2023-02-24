
const menfsModel = require('../models/menfashionModel')
class fashionController {


  async showMenfashion(req, res) {
    const rows = await menfsModel.returnProduct();
    //console.log(rows);
    res.render('menfashion',
    {
      product: rows,
      empty: rows.length === 0
    });
  }

  // showMenfashion(req, res) {
  //   // const rows = await db.load('SELECT * from product');
  //   res.render('menfashion');
  // }

}
module.exports = new fashionController();
