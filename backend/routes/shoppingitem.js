/** Express router providing shopping item related routes
 * @module routes/shoppingitem
 * @requires express
 */

/**
 * express module
 * @const
 */

const express = require("express");

/**
 * Express router to mount shopping item related functions on.
 * @type {object}
 * @const
 * @namespace shoppingitemRouter
 */
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const ShoppingListItem = require("../models/ShoppingListItem");
const axios = require("axios");
var querystring = require("querystring");
var https = require("https");
const circularJSON = require("circular-json");
require("dotenv").config();

var PayPalClientID = process.env.PayPalClientID;
var PayPalClientSecret = process.env.PayPalClientSecret;

/**
 * Route for gaining access token from paypal.
 * @name post/get_access
 * @function
 * @memberof module:routes/shoppingitem~shoppingitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} Access token obtained from paypal.
 */

router.post("/get_access", async function(request, response) {
  var base64encodedData = await new Buffer(
    PayPalClientID + ":" + PayPalClientSecret
  ).toString("base64");
  var options = {
    "method": "POST",
    "hostname": "api.sandbox.paypal.com",
    "path": "/v1/oauth2/token",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + base64encodedData
    }
  };
  var req = await https.request(options, function(res) {
    var chunks = [];
    res.on("data", function(chunk) {
      chunks.push(chunk);
    });
    res.on("end", function() {
      var body = Buffer.concat(chunks);
      var jsonBody = JSON.parse(body.toString());
      console.log(jsonBody);
      response.status(201).send(jsonBody);
    });
  });
  try {
    await req.write(
      querystring.stringify({ grant_type: "client_credentials" })
    );
    req.end();
  } catch {
    response.status(400).send("Error getting access token.");
  }
});

/**
 * Route for sending invoices to users through paypal.
 * @name post/send_invoice
 * @function
 * @memberof module:routes/shoppingitem~shoppingitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {JSON} Generated invoices.
 */

router.post("/send_invoice", async function(req, res) {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + req.body.access_token
    }
  };
  console.log(config);
  // get invoice number
  await axios
    .post(
      "https://api.sandbox.paypal.com/v2/invoicing/generate-next-invoice-number",
      null,
      config
    )
    // create invoice draft
    .then(async response => {
      let jsonString = circularJSON.stringify(response.data);
      let json = JSON.parse(jsonString);
      console.log(json);
      var invoice_draft = {
        "detail": {
          "invoice_number": json.invoice_number,
          "invoice_date": "2019-11-30",
          "currency_code": "USD"
        },
        "invoicer": {
          "name": {
            "given_name": req.session.user.first_name,
            "surname": req.session.user.last_name
          },
          "email_address": req.session.user.email
        },
        "primary_recipients": [
          {
            "billing_info": {
              "name": {
                "given_name": req.body.invoicee.first_name,
                "surname": req.body.invoicee.last_name
              },
              "email_address": req.body.invoicee.email
            }
          }
        ],
        "items": [
          {
            "name": "Roomies Shopping List Charge",
            "quantity": "1",
            "unit_amount": {
              "currency_code": "USD",
              "value": req.body.amount
            }
          }
        ],
        "amount": {
          "currency_code": "USD",
          "value": req.body.amount,
          "breakdown": {}
        }
      };
      let bodyString = JSON.stringify(invoice_draft);
      return axios.post(
        "https://api.sandbox.paypal.com/v2/invoicing/invoices",
        bodyString,
        config
      );
    })
    // send invoice
    .then(response => {
      let jsonString = circularJSON.stringify(response.data);
      let json = JSON.parse(jsonString);
      console.log(json);
      return axios.post(json.href + "/send", null, config);
    })
    // invoice sent
    .then(response => {
      let jsonString = circularJSON.stringify(response);
      let json = JSON.parse(jsonString);
      console.log(json);
      res.status(202).send(json);
    })
    .catch(error => {
      console.log("Error: " + error);
      res.status(400).send(error);
    });
});

/**
 * Route for adding a shopping list item to an apartment.
 * @name post/add
 * @function
 * @memberof module:routes/shoppingitem~shoppingitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {ObjectID} Id of the item added.
 */

router.post("/add", async function(req, res) {
  let userIds = [];

  let requests = req.body.people.map(async user => {
    return new Promise(async (resolve, reject) => {
      var name = user.split(" ");
      var userFirstName = name[0];
      var userLastName = name[1];
      try {
        let foundUser = await User.findOne({
          first_name: userFirstName,
          last_name: userLastName
        });
        userIds.push(foundUser._id);
      } catch (err) {
        reject();
      }
      resolve();
    });
  });

  Promise.all(requests)
    .then(async () => {
      let item = await ShoppingListItem.create({
        item: req.body.item,
        description: req.body.notes,
        apartment: req.session.user.apartment,
        users: userIds
      });
      res.status(201).send(item._id);
    })
    .catch(() => {
      res.status(400).send("Error creating shopping list item.");
    });
});

/**
 * Route for retrieving all shopping list items of an apartment.
 * @name get/get
 * @function
 * @memberof module:routes/shoppingitem~shoppingitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {List<ShoppingListItem>} List of shopping list items.
 */

router.route("/get").get((req, res) => {
  ShoppingListItem.find({ apartment: req.session.user.apartment })
    .populate("users")
    .then(items => {
      let populatedItems = [];
      items.forEach(item => {
        let names = [];
        item.users.forEach(user => {
          names.push(user.first_name + " " + user.last_name);
        });
        populatedItems.push({
          item: item.item,
          notes: item.description,
          people: names,
          itemID: item._id
        });
      });
      res.status(200).json(populatedItems);
    })
    .catch(error => res.status(400).json("Error: " + error));
});

/**
 * Route for deleting a shopping list item.
 * @name delete/delete
 * @function
 * @memberof module:routes/shoppingitem~shoppingitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success".
 */

router.delete("/delete/:id", async function(req, res) {
  try {
    await ShoppingListItem.deleteOne({ _id: req.params.id });
  } catch (err) {
    res.status(400).send("Error deleting item.");
  }
  res.status(200).send("Success");
});

module.exports = router;
