const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
const router = require("./routes/router.js");

router.get("/",(req,res,next )=>{

    return res.send({
      error: true,
      message: "no routes" })
  
    })
   


app.use('/api', router);

app.listen(PORT, () => console.log("Server running on port "+ PORT))
