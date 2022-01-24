const express = require('express');
const db = require("../config/db.js");
const router = express.Router();

router.get("/",(req,res,next )=>{

  return res.send({
    error: true,
    message: "no routes" })

  })



router.get("/product_add1", (req, res)=>{
    res.send("hello")
  })

  router.delete("/product/:id",(req,res)=>{
    db.query("DELETE FROM product WHERE idProduct = ?",[req.params.id],(error,results,fields)=>{
      if(error) 

        res.json({massage:"Error"})
          else
            res.json({massage:"Success"})
      })
  })

  //API Add product
  router.post("/product_add1",async(req,res)=>{

    let Product_Name = req.body.Product_Name;
    let Product_Count = req.body.Product_Count;
    let Product_Expire = req.body.Product_Expire;
    let Product_Cost = req.body.Product_Cost;
    let Product_Detail = req.body.Product_Detail;
    let Product_Picture = req.body.Product_Picture;
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

          db.query('INSERT INTO product SET ?',[dataProduct],(err, result) => {
          if(!err){
              res.send('Add Product successful');
          } else {
              console.log(err)
          }
        
      })
    }


  })

  module.exports = router;