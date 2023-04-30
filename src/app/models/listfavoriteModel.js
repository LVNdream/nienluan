const db = require('../../utilities/db');
const TBL_ListFavorite = 'listfavorite'
module.exports = {
    returnAllFavorite: function () {
        return db.load('SELECT * from listfavorite');
    },
    disFavorite: async function (entity) {
        return db.add(TBL_ListFavorite,entity);
    },
    deleteFavorite: async function (iduser,masp) {
        return db.delete(TBL_ListFavorite,iduser,masp);
    },
    returnAllFavoriteByUser: function (iduser) {
        return db.load(`SELECT * from listfavorite where iduser='${iduser}'`);
    },
};