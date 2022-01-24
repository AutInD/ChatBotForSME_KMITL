const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./config/db.js");

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload())
app.use(express.static("./upload"))

app.get("/",(req,res)=>{
  res.send("This is API Back-End")
})
app.post("/create_product", (req,res)=>{
  //console.log(req.files);
  var file1 = req.files.Product_Picture
  var filename1 = file1.name

  //console.log(filename1);
  const filename = Date.now()+"_"+ filename1;
  const file = req.files.Product_Picture;
  const product_img = "/product_img/"
  const URL = "/upload/"+product_img+filename;
  let uploadPath = __dirname+URL;
  //let img = URL;
  //console.log(req.files.name.Product_Picture);

  file.mv(uploadPath,(err)=>{
    if(err){
      return res.send(err)
    }
  })
  
  //console.log(req.files);
  //console.log(req.body);
  let Product_Name = req.body.Product_Name;
  let Product_Count = req.body.Product_Count;
  let Product_Expire = req.body.Product_Expire;
  let Product_Cost = req.body.Product_Cost;
  let Product_Detail = req.body.Product_Detail;
  let Product_Picture = filename;
  let errors = false;
    

  if(!errors){

    let dataProduct = {
      Product_Name: Product_Name,
      Product_Count: Product_Count,
      Product_Expire: Product_Expire,
      Product_Cost: Product_Cost,
      Product_Detail: Product_Detail,
      Product_Picture: product_img+Product_Picture,
    }

      db.query('INSERT INTO Product SET ?',[dataProduct],(err, result) => {
        if(!err){
            res.json({
              message: "Insert Success",
              url: URL
            });
            //res.send('Add Product successful');
            //console.log(uploadPath);
        } else {
            console.log(err)
        } 
    })
  }
  console.log("Success")
})

app.get("/show_pd",(req,res)=>{
  db.query("SELECT * FROM Product",[],(error,results,fields)=>{
    if(error) res.send({error:true,message:error})
    res.send({error:false,data:results})
    })
})



app.get("/order",(req,res)=>{
  db.query("SELECT * FROM ChatBotForSMEsDB.Order",[],(error,results,fields)=>{
    if(error) res.send({error:true,message:error})
    res.send({error:false,data:results})
    })
})

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
const router = require("./routes/router.js");
const { get } = require("./routes/router.js");

router.get("/",(req,res,next )=>{

    return res.send({
      error: true,
      message: "no routes" })
      })

app.use('/api', router);

app.listen(PORT, () => console.log("Server running on port "+ PORT))
