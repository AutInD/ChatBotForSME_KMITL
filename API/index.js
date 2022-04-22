const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const db = require("./config/db.js");
const request = require("request");
const mysql = require("mysql");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("./upload"));

app.get("/", (req, res) => {
  res.send("This is API Back-End");
  res.setHeader("X-Foo", "bar");
});


app.post("/create_product", (req, res) => {
  //console.log(req.files);
  var file1 = req.files.Product_Picture;
  var filename1 = file1.name;
  const filename = Date.now() + "_" + filename1;
  const file = req.files.Product_Picture;
  const product_img = "/product_img/";
  const URL = "/upload/" + product_img + filename;
  let uploadPath = __dirname + URL;
  //let img = URL;
  //console.log(req.files.name.Product_Picture);
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.send(err);
    }
  });


  //console.log(req.files);
  //console.log(req.body);
  let Product_Name = req.body.Product_Name;
  let Product_Count = req.body.Product_Count;
  let Product_Expire = req.body.Product_Expire;
  let Product_Cost = req.body.Product_Cost;
  let Product_Detail = req.body.Product_Detail;
  let Product_Picture = filename;
  let errors = false;

  if (!errors) {
    let dataProduct = {
      Product_Name: Product_Name,
      Product_Count: Product_Count,
      Product_Expire: Product_Expire,
      Product_Cost: Product_Cost,
      Product_Detail: Product_Detail,
      Product_Picture: product_img + Product_Picture,
    };

    db.query("INSERT INTO Product SET ?", [dataProduct], (err, result) => {
      if (!err) {
        res.json({
          message: "Insert Success",
          url: URL,
        });
        //res.send('Add Product successful');
        //console.log(uploadPath);
      } else {
        console.log(err);
      }
    });
  }
  console.log("Success");
});

app.get("/show_pd", (req, res) => {
  db.query("SELECT * FROM Product", [], (error, results, fields) => {
    if (error) res.send({ error: true, message: error });
    res.send({ error: false, data: results });
  });
});

app.get("/order", (req, res) => {
  db.query(
    "SELECT * FROM ChatBotForSMEsDB.Order",
    [],
    (error, results, fields) => {
      if (error) res.send({ error: true, message: error });
      res.send({ error: false, data: results });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.use(cors());
const router = require("./routes/router.js");
const { get, connect } = require("./routes/router.js");

router.get("/", (req, res, next) => {
  return res.send({
    error: true,
    message: "no routes",
  });
});

app.use("/api", router);
app.listen(PORT, () => console.log("🚀 Server ready ~~~~ " + PORT));
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
app.get("/", function (_req, res) {
  res.send("Hello World");
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  // Your verify token. Should be a random string.
  const VERIFY_TOKEN = "chatbot1";

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Creates the endpoint for your webhook
app.post("/webhook", (req, res) => {
  let body = req.body;

  // Checks if this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Get the sender PSID
      let senderPsid = webhookEvent.sender.id;
      console.log("Sender PSID: " + senderPsid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhookEvent.message) {
        handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        handlePostback(senderPsid, webhookEvent.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

app.post("/update_trackingnumber/:id", (req, res, next) => {
  function queryDatabase(db) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM ChatBotForSMEsDB.Order",
        (error, results, fields) => {
          resolve(results);
        }
      );
    });
  }

  const PAGE_ACCESS_TOKEN =
    "EAAQZB6Pc5SXYBAEglKGJTf6xPFwSJChkgwuGkZCRNL1WzzT7V1xiIkXKJJPncg0bjmO3GDPJZAZCQUS8OZCoTgwjrPkYZAtsOoS1bPTKEduBMkCD7plegSEKx7hZA1NRg5pIaVCchUUL1WqpCBUUrlebcbn8ylrA6D7Ts569Kenzeh9sBWScnFK";

  let id = req.params.id;
  let Order_Tracking = req.body.Order_Tracking;

  var data_sender;
  var data_delivery;
  console.log(Order_Tracking);
  console.log(id);

  function connectToDatabase() {
    const db = mysql.createConnection({
      host: "188.166.223.10",
      user: "authapol",
      password: "4150Tainner!",
      database: "ChatBotForSMEsDB",
    });
    return new Promise((resolve, reject) => {
      db.connect();
      resolve(db);
    });
  }

  async function properties() {
    return connectToDatabase().then((connection) => {
      return queryDatabase(connection).then((result) => {
        for (let n = 0; n < result.length; n++) {
          if (id == `${result[n].id}`) {
            data_sender = result[n].Order_SenderID;
            data_delivery = result[n].Order_DeliveryType;
          }
        }

        connection.end();
        console.log(data_sender);
        console.log(data_delivery);
      });
    });
  }
  //db.query('UPDATE ChatBotForSMEsDB.Order SET ? WHERE id = '+id, form_order,(error,results)=>{

  db.query(
    "UPDATE ChatBotForSMEsDB.Order SET Order_Tracking = ? WHERE id = ?",
    [Order_Tracking, id],
    (error, results) => {
      db.query(
        "SELECT * FROM ChatBotForSMEsDB.Order",
        (error, result, fields) => {
          for (let n = 0; n < result.length; n++) {
            if (id == `${result[n].id}`) {
              data_sender = result[n].Order_SenderID;
              data_delivery = result[n].Order_DeliveryType;
            }
          }

          console.log(data_delivery);
          console.log(data_sender);
          properties();

          let requestBody = {
            sender: {
              id: "110100641400020",
            },
            recipient: {
              id: "4296818573720366",
            },
            message: {
              text:
                `เลขพัสดุของท่านคือ : ${Order_Tracking} ประเภทการขนส่ง : ` +
                data_delivery,
            },
          };
          // Send the HTTP request to the Messenger Platform

          request(
            {
              uri: "https://graph.facebook.com/v2.6/me/messages",
              qs: { access_token: PAGE_ACCESS_TOKEN },
              method: "POST",
              json: requestBody,
            },
            (err, _res, _body) => {
              if (!err) {
                console.log("ตอบกลับเลขพัสดุสำเร็จ");
              } else {
                console.error("Unable to send message:" + err);
              }
            }
          );
        }
      );
    }
  );
});

// Handles messages events
function handleMessage(senderPsid, received_message) {
  let response;

  // Checks if the message contains text
  if (received_message.text == "ขอเลขพัสดุ") {
    db.query(
      "SELECT Order_Tracking,Order_SenderID FROM ChatBotForSMEsDB.Order ",
      [],
      (error, results, fields) => {
        const trackingnumber = results[0].Order_Tracking;
        console.log(trackingnumber);
        // Creates the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
          //"text": `You sent the message: "${received_message.text}". Now send me an attachment!`
          text: `เลขพัสดุของคุณลูกค้าคือ : "${trackingnumber}"`,
        };
        callSendAPI(senderPsid, response);
      }
    );
  }

  // Sends the response message
  callSendAPI(senderPsid, response);
}

// Handles messaging_postbacks events
function handlePostback(senderPsid, receivedPostback) {
  let response;

  // Get the payload for the postback
  let payload = receivedPostback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    response = { text: "หมายเลขพัสดุของท่านคือ : TH123456789" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  // Send the message to acknowledge the postback

  callSendAPI(senderPsid, response);
}

// Sends response messages via the Send API
function callSendAPI(senderPsid, response) {
  // The page access token we have generated in your app settings
  const PAGE_ACCESS_TOKEN =
    "EAAQZB6Pc5SXYBAEglKGJTf6xPFwSJChkgwuGkZCRNL1WzzT7V1xiIkXKJJPncg0bjmO3GDPJZAZCQUS8OZCoTgwjrPkYZAtsOoS1bPTKEduBMkCD7plegSEKx7hZA1NRg5pIaVCchUUL1WqpCBUUrlebcbn8ylrA6D7Ts569Kenzeh9sBWScnFK";

  // Construct the message body
  let requestBody = {
    recipient: {
      id: senderPsid,
    },
    message: response,
  };
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: requestBody,
    },
    (err, _res, _body) => {
      if (!err) {
        console.log("Message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

// listen for requests :)
