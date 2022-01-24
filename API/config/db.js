const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "188.166.223.10",
    user: "authapol",
    password: "4150Tainner!",
    database: "ChatBotForSMEsDB"
});

connection.connect();

module.exports = connection;