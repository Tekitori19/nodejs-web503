const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book'
});

db.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});

module.exports = db;
