const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./config/db.js");
const request = require("request");

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





app.use(cors());
const router = require("./routes/router.js");
const { get } = require("./routes/router.js");

router.get("/",(req,res,next )=>{
    return res.send({
      error: true,
      message: "no routes" })
      })

app.use('/api', router);

app.listen(PORT, () => console.log("🚀 Server ready ~~~~ "+ PORT))

//WEBHOOK ALL
/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `yarn install`
 * 3. Add your VERIFY_TOKEN and PAGE_ACCESS_TOKEN to your environment vars
 */



 
 // Respond with 'Hello World' when a GET request is made to the homepage
 app.get('/', function (_req, res) {
   res.send('Hello World');
 });
 
 // Adds support for GET requests to our webhook
 app.get('/webhook', (req, res) => {
 
   // Your verify token. Should be a random string.
   const VERIFY_TOKEN = "chatbot1";
 
   // Parse the query params
   let mode = req.query['hub.mode'];
   let token = req.query['hub.verify_token'];
   let challenge = req.query['hub.challenge'];
 
   // Checks if a token and mode is in the query string of the request
   if (mode && token) {
 
     // Checks the mode and token sent is correct
     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
 
       // Responds with the challenge token from the request
       console.log('WEBHOOK_VERIFIED');
       res.status(200).send(challenge);
 
     } else {
       // Responds with '403 Forbidden' if verify tokens do not match
       res.sendStatus(403);
     }
   }
 });
 
 // Creates the endpoint for your webhook
 app.post('/webhook', (req, res) => {
   let body = req.body;
 
   // Checks if this is an event from a page subscription
   if (body.object === 'page') {
 
     // Iterates over each entry - there may be multiple if batched
     body.entry.forEach(function(entry) {
 
       // Gets the body of the webhook event
       let webhookEvent = entry.messaging[0];
       console.log(webhookEvent);
 
       // Get the sender PSID
       let senderPsid = webhookEvent.sender.id;
       console.log('Sender PSID: ' + senderPsid);
 
       // Check if the event is a message or postback and
       // pass the event to the appropriate handler function
       if (webhookEvent.message) {
         handleMessage(senderPsid, webhookEvent.message);
       } else if (webhookEvent.postback) {
         handlePostback(senderPsid, webhookEvent.postback);
       }

     });
 
     // Returns a '200 OK' response to all requests
     res.status(200).send('EVENT_RECEIVED');
   } else {
 
     // Returns a '404 Not Found' if event is not from a page subscription
     res.sendStatus(404);
   }
 });
 
 // Handles messages events
 function handleMessage(senderPsid, receivedMessage) {
   let response;
 

   // Checks if the message contains text
   if (receivedMessage.text == "ส่งเลขพัสดุ") {
     // Create the payload for a basic text message, which
     // will be added to the body of your request to the Send API
     db.query("SELECT * FROM ChatBotForSMEsDB.Order",[],(error,results,fields)=>{
      if(error) res.send({error:true,message:error})
      res.send({error:false,data:results})
      let Order_Tracking = req.body.Order_Tracking;
      })

     response = {
       'text': `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`
      
       
     };
   } else if (receivedMessage.attachments) {
     // Get the URL of the message attachment
     let attachmentUrl = receivedMessage.attachments[0].payload.url;
     response = {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': [{
            'title': 'Is this the right picture?',
            'subtitle': 'Tap a button to answer.',
            'image_url': attachmentUrl,
            'buttons': [
              {
                'type': 'postback',
                'title': 'ส่งเลขพัสดุ',
                'payload': 'yes',
              },
              
            ],
          }]
        }
      }
    
     };
   }
 
   // Send the response message
   callSendAPI(senderPsid, response);
 }
 
 // Handles messaging_postbacks events
 function handlePostback(senderPsid, receivedPostback) {
   let response;
 

   // Get the payload for the postback
   let payload = receivedPostback.payload;
 
   // Set the response based on the postback payload
   if (payload === 'yes') {
     response = { 'text': 'หมายเลขพัสดุของท่านคือ : TH123456789' };
   } else if (payload === 'no') {
     response = { 'text': 'Oops, try sending another image.' };
   }
   // Send the message to acknowledge the postback

   callSendAPI(senderPsid, response);
 }
 
 
 // Sends response messages via the Send API
 function callSendAPI(senderPsid, response) {
 
   // The page access token we have generated in your app settings
   const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
 
   // Construct the message body
   let requestBody = {
     'recipient': {
       'id': senderPsid
     },
     'message': response
   };
 
   // Send the HTTP request to the Messenger Platform
   request({
     'uri': 'https://graph.facebook.com/v2.6/me/messages',
     'qs': { 'access_token': PAGE_ACCESS_TOKEN },
     'method': 'POST',
     'json': requestBody
   }, (err, _res, _body) => {
     if (!err) {
       console.log('Message sent!');
     } else {
       console.error('Unable to send message:' + err);
     }
   });
 }
 
 // listen for requests :)
