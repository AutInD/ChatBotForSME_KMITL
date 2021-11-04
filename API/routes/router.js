const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const db = require("../config/db.js");
const userMiddleware = require("../middleware/users.js")

router.get("/test",(req,res,next )=>{

    return res.send({
      error: true,
      message: "no route" })
  
    })


// http://localhost:3000/api/sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM user WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
      (err, result) => {
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
    db.query("SELECT * FROM product",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })
  })

  router.get("/product/:id",(req,res)=>{
    db.query("SELECT * FROM product WHERE idProduct = ?",[req.params.id],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })

  })

  //Delete Product
  router.delete("/product/:id",(req,res)=>{
    db.query("DELETE FROM product WHERE idProduct = ?",[req.params.id],(error,results,fields)=>{
      if(error) 

        res.json({massage:"Error"})
          else
            res.json({massage:"Success"})
      })
  })
  //API Add product
  router.post("/product",(req,res)=>{
    db.query(`
      INSERT INTO product(Product_Name, Product_Count, Product_Expire, Product_Cost, Product_Detail, Product_Picture) VALUES 
    (${db.escape(req.body.Product_Name)},
      ${db.escape(req.body.Product_Count)},
      ${db.escape(req.body.Product_Expire)},
      ${db.escape(req.body.Product_Cost)},
      ${db.escape(req.body.Product_Detail)},
      ${db.escape(req.body.Product_Picture)} )`
        , (err, result) => {
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err
            });
          }

          return res.status(201).send({
            msg: 'Add product successfully !'
          });

        }
    );


  })

  router.get("/user",(req,res,next)=>{
    db.query("SELECT * FROM user",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      })
  })



module.exports = router;