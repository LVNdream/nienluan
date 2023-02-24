const db = require('../../utilities/db');
const TBL_PAY = 'hoadon';
const TBL_chitiethd = 'chitiethd';
module.exports = {
    addPay: function (entity) {
        return db.add(TBL_PAY, entity);
    },
    addChitiethd: function (entity) {
        return db.add(TBL_chitiethd, entity);
    },
    returnPay: function() {
        return db.load('SELECT * from hoadon');
    }
};