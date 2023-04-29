const db = require('../../utilities/db');
const TBL_ORDERS = 'hoadon';
const TBL_CTHD = 'chitiethd ';
const TBL_PRODUCT = 'product';
const TBL_chitietsp = 'chitietsp';
module.exports = {
    selectCTHD: async function (idhd) {
        const rowCTOrder = await db.load(
            `select chitiethd.masp,avata,tensp,giasp,soluong,size,color from ${TBL_CTHD},${TBL_PRODUCT} where chitiethd.masp=product.masp and chitiethd.idhd = '${idhd}'`
        );
        if (rowCTOrder.length === 0) {
            return null;
        }
        return rowCTOrder;
    },
    select_prdcut_ById: async function (masp) {
        const rowSp = await db.load(`select * from ${TBL_PRODUCT} where masp = '${masp}'`);
        if (rowSp.length === 0) {
            return null;
        }
        return rowSp;
    },
    selectAllOrder: async function () {
        const rowOrder = await db.load(`select * from ${TBL_ORDERS}`);
        if (rowOrder.length === 0) {
            return null;
        }
        return rowOrder;
    },
    selectOrderByDate: async function (date) {
        const rowOrder = await db.load(`select * from ${TBL_ORDERS} where date(ngaylaphd)='${date}' `);
        if (rowOrder.length === 0) {
            return null;
        }
        return rowOrder;
    },
    selectOrderByMonth: async function (month,year) {
        const rowOrder = await db.load(`select * from ${TBL_ORDERS} where month(ngaylaphd)='${month}' and year(ngaylaphd)='${year}' `);
        if (rowOrder.length === 0) {
            return null;
        }
        return rowOrder;
    },

    /// cập nhật hóa đơn bên admin

    updateHD_Admin: async function (entity) {
        const condition = {
            idhd: entity.idhd
        }
        delete entity.idhd
        return db.updateHD(TBL_ORDERS, entity, condition)
    },
    updateQuanlityProduct: async function (entity) {
        const condition = {
            masp: entity.masp
        }
        delete entity.masp
        return db.updateHD(TBL_PRODUCT, entity, condition)
    },


    //// hàm thêm sản phẩm
    addProduct: function (entity) {
        return db.add(TBL_PRODUCT, entity);
    },
    addChitietsp: function (entity) {
        return db.add(TBL_chitietsp, entity);
    },
};