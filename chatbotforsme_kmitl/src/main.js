import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const mysql = require("mysql2");
const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatbotforsmedb"
}).promise()

module.exports = dbConnection;

createApp(App).use(store).use(router).mount('#app')
