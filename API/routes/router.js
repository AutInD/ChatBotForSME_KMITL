const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../config/db.js");
const userMiddleware = require("../middleware/users.js")

const fileUpload = require("express-fileupload")
const path = require("path");
const util = require('util');


//const app = express();
router.use(fileUpload());

//router.use(express.static("./routes/public"));

router.get("/upload", (req, res)=>{
  res.send("hello")
})
router.post("/upload", async (req, res) => {
  try {
    const file = req.files.file;
    const fileName = file.name;
    const size = file.data.length;
    const extension = path.extname(fileName);
  
    const allowedExtensions = /png|jpeg|jpg|gif/;
  
    if (!allowedExtensions.test(extension)) throw "Unsupported extension!";
    if (size > 5000000) throw "File must be less than SMB"

    const md5 = file.md5;
    const URL = "/product_img/" + md5 + extension;

    await util.promisify(file.mv)("./upload"+ URL);
    
    res.json ({
      message: "File uploaded successfully!!!",
      url: URL,
    })


  }catch(err){
    console.log(err);
    res.status(500).json({

    });
  }
  


});




// http://localhost:3000/api/sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM user WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
      (err, result) => {
        
        console.log(result)

        if (result.length) {
          return res.status(409).send({
            msg: 'This username is already in use!'
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO user (idUser, username, password, User_Fname, User_Sname, registered) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.username
                )}, ${db.escape(hash)}, ${db.escape(req.body.User_Fname)}, ${db.escape(req.body.User_Fname)}, now())`,

                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registered!'
                  });
                }
              );
            }
          });
        }
      }
    );
  });

// http://localhost:3000/api/login
router.post("/login", (req, res, next) => {
    db.query(
        `SELECT * FROM user WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
          // user does not exists
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err
            });
          }
          if (!result.length) {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          // check password
          bcrypt.compare(
            req.body.password,
            result[0]['password'],
            (bErr, bResult) => {
              // wrong password
              if (bErr) {
                throw bErr;
                return res.status(401).send({
                  msg: 'Username or password is incorrect!'
                });
              }
              if (bResult) {
                const token = jwt.sign({
                    username: result[0].username,
                    userId: result[0].Userid
                  },
                  'SECRETKEY', {
                    expiresIn: '7d'
                  }
                );
                db.query(
                  `UPDATE user SET last_login = now() WHERE idUser = '${result[0].idUser}';`
                );
                return res.status(200).send({
                  msg: 'Logged in!',
                  token,
                  user: result[0]
                });
              }
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
          );
        }
      );
    });

// http://localhost:3000/api/secret-route
router.get("/secret-route", userMiddleware.isLoggedIn,(req, res, next) => {
    console.log(req.userData);
    res.send("This is secret content");
});

// http://localhost:3000/api/product
  router.get("/product",(req,res,next)=>{
    db.query("SELECT * FROM Product",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })
  })


//
  router.get("/product/:id",(req,res)=>{
    db.query("SELECT * FROM Product WHERE idProduct = ?",[req.params.id],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })

  })

  //Delete Product
  router.delete("/product/:id",(req,res)=>{
    db.query("DELETE FROM Product WHERE idProduct = ?",[req.params.id],(error,results,fields)=>{
      if(error) 

        res.json({massage:"Error"})
          else
            res.json({massage:"Success"})
      })
  })

  //API Add product
  /*  
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/product_img/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})  */

  router.post("/product_add",(req,res,err)=>{

    let Product_Name = req.body.Product_Name;
    let Product_Count = req.body.Product_Count;
    let Product_Expire = req.body.Product_Expire;
    let Product_Cost = req.body.Product_Cost;
    let Product_Detail = req.body.Product_Detail;
    let Product_Picture = req.body.Product_Picture; 
    //let Product_Picture = req.file.filename;
    //var imgsrc = 'http://localhost:3000/api' + req.body.filename;
    let errors = false;

    if(!errors){
      let dataProduct = {
        Product_Name: Product_Name,
        Product_Count: Product_Count,
        Product_Expire: Product_Expire,
        Product_Cost: Product_Cost,
        Product_Detail: Product_Detail,
        Product_Picture: Product_Picture,
        
      }
      
        
        db.query('INSERT INTO Product SET ?',[dataProduct],(err, result) => {
          if(!err){
              res.send('Add Product successful');
          } else {
              console.log(err)
          }
        
      })
    }

  })

  //API Update product
  router.post("/product/:id",(req,res,next)=>{
    let id = req.params.id;
    let Product_Name = req.body.Product_Name;
    let Product_Count = req.body.Product_Count;
    let Product_Expire = req.body.Product_Expire;
    let Product_Cost = req.body.Product_Cost;
    let Product_Detail = req.body.Product_Detail;
    let Product_Picture = req.body.Product_Picture;
    let errors = false;

    if(!errors) {

    let form_product = {
        Product_Name: Product_Name,
        Product_Count: Product_Count,
        Product_Expire: Product_Expire,
        Product_Cost: Product_Cost,
        Product_Detail: Product_Detail,
        Product_Picture: Product_Picture,
      }
      db.query('UPDATE product SET ? WHERE idProduct = ' + id, form_product, (error,results)=>{
          if(error) res.send({error:true,message:error})
          res.send({error:false,data:results})
        })
      }
      
  })
  

  router.get("/user",(req,res,next)=>{
    db.query("SELECT * FROM user",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })
  })



module.exports = router;