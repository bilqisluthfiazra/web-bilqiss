const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // sesuaikan
    password: "",      // sesuaikan
    database: "dbweb"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected");
});

module.exports = db;
