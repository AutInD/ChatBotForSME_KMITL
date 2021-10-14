const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatbotforsmedb"
});

connection.connect();

module.exports = connection;