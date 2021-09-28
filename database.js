const {

    createPool
} = require('mysql');
 
const pool = createPool ({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatbotforsmedb"

})

pool.query('SELECT * FROM user', (err, result, fields) => {

    if (err) {
        return console.log(err);
    }
    return console.log(result);
    
})
