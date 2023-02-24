const db = require('../../utilities/db');
module.exports={
    returnProduct: function() {
        return db.load('SELECT * from product');
    }
};