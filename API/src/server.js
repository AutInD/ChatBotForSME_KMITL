const { request } = require('express')
const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")
const port = 3001

const dbConn = mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
  database:'chatbotforsmedb'

})

const router = express.Router()

router.get("/",(req,res,next )=>{

  return res.send({
    error: true,
    message: "no routes" })

  })

  router.get("/product",(req,res,next)=>{
    dbConn.query("SELECT * FROM product",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })
  })

  router.get("/user",(req,res,next)=>{
    dbConn.query("SELECT * FROM user",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })
  })

  

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(router)

app.listen(port, () => {
  console.log(`Running server in port : http://localhost:${port}`)
  console.log(`Database Connected !!`)

})



