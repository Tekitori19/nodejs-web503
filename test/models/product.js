const db = require('../database');

module.exports = class Product {
    constructor() { }

    static saveProduct(product) {
        db.query('INSERT INTO products SET ?', product, function (err, data) {
            if (err) throw err;
            return true;
        });
    }

    static fetchAll() {
        let sql = `SELECT * FROM products`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            return data;
        });
    }

    static findById(id) {
        let sql = `SELECT * FROM products WHERE idProduct = ?`;
        db.query(sql, [id], function (err, data) {
            if (err) throw err;
            return data[0];
        });
    }
};
