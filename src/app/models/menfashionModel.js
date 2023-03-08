const db = require('../../utilities/db');
const TBL_ListFavorite = 'listfavorite'
const TBL_product = 'product'
module.exports = {
    returnProduct: function () {
        return db.load(`SELECT * from ${TBL_product}`);
    },
    returnProductById: async function (masp) {
        const rowPD = await db.load(`select * from ${TBL_product} where masp = '${masp}'`);
        if (rowPD.length === 0) {
            return null;
        }
        return rowPD[0];
    },
    returnCtProduct: function (masp) {
        return db.load(`SELECT * from chitietsp where masp = '${masp}'`);
    },
    returnAllFavorite: function () {
        return db.load('SELECT * from listfavorite');
    },
    addFavorite: async function (entity) {
        return db.add(TBL_ListFavorite,entity);
    },
};