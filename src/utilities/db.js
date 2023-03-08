
const mysql = require('mysql');
const config = require('../config/db.json');
const pool = mysql.createPool(config.mysql);

module.exports = {
    /// đây là hàm load cũ
    // load: function (sql) {
    //     var cn = mysql.createConnection(config.mysql);
    //     cn.connect();
    //     cn.query(sql, function (error, results, fields) {
    //           if (error) throw error;
    //           console.log(results);
    //           cn.end();
    //         });
    // }
    ////////////////////đây là hàm load cũ cách gọi callback
    // load: function (sql, fn_done, fn_fail) {
    //     pool.query(sql, function (error, results, fields) {
    //         if (error) {
    //             return fn_fail(error);
    //         }
    //         fn_done(results)
    //     });
    // }

    load: function (sql) {
        return new Promise(function (resolve, reject) {
            pool.query(sql, function (error, results, fields) {
                if (error) {
                    //console.log('lỗi',error)
                    return reject(error);
                }
                //console.log('kq',results)
                resolve(results)
            });
        });
    },
    // thêm dữ liệu vào database
    add: function (table, entity) {
        const sql = `insert into ${table} set ?`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, entity, function (error, results) {
                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        });
    },

    // hàm thêm tài khoản

    addacc: function (table, entity) {
        const sql = `insert into ${table} set ?`;
        return new Promise(function (resolve, reject) {
            //console.log('12333333333333333333333333333333')
            pool.query(sql, entity, function (error, results) {
                if (error) {
                    //console.log('ưewewewewewe',error)
                    resolve({
                        thongbao: 'Tài khoản Email đã tồn tại',
                        maloi: true
                    });
                }
                //console.log('ưewewewewewe',results)
                resolve({
                    thongbao: 'Bạn đã đăng kí thành công',
                    maloi: false
                })
            });
        });
    },
    updateHD: function (table, entity,condition) {
        const sql = `update ${table} set ? where ?`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, [entity,condition], function (error, results) {
                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        });
    },
    // hàm xóa dữ liệu trong database
    delete: function (table, iduser,masp) {
        const sql = `delete from ${table} where iduser =${iduser} and  masp = ${masp}   `;
        return new Promise(function (resolve, reject) {
            pool.query(sql, function (error, results) {
                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        });
    }

};