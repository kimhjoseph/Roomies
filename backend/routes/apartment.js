/** Express router providing apartment related routes
 * @module routes/apartment
 * @requires express
 */

/**
 * express module
 * @const
 */


const express = require("express");


/**
 * Express router to mount apartment related functions on.
 * @type {object}
 * @const
 * @namespace apartmentRouter
 */

const router = express.Router();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Apartment = require("../models/Apartment");


/**
 * Function for generating apartment code.
 * @name makeId
 * @function
 * @memberof module:routes/apartment~apartmentRouter
 * @inner
 * @return {string} Generated apartment code.
 */


function makeId() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  try {
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  } catch (err) {
    console.log("Could not generate ID.");
  }
  return result;
}


/**
 * Route for creating an apartment.
 * @name get/create
 * @function
 * @memberof module:routes/apartment~apartmentRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} 'Successfully created apartment'.
 */

router.get("/create", async function(req, res) {
  let apartment;
  let user;

  try {
    apartment = await Apartment.create({ _id: new ObjectId(), code: makeId() });
    console.log("Successfully created apartment");
    console.log(apartment);
  } catch (err) {
    res.status(400).send("Error creating apartment.");
  }

  try {
    user = await User.findOneAndUpdate(
      { email: req.session.user.email },
      { apartment: apartment._id },
      { new: true }
    );
    console.log("Successfully updated user. ");
    console.log(user);
  } catch (err) {
    res.status(400).send("Error adding information to user.");
  }
  req.session.user = user;
  console.log("Sucessfully change req.session.user");
  console.log(req.session.user);
  res.status(200).json(apartment.code);
});

/**
 * Route for joining an apartment.
 * @name post/join
 * @function
 * @memberof module:routes/apartment~apartmentRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} 'Successfully created apartment'.
 */

router.post("/join", async function(req, res) {
  let apartment;
  let user;
  console.log(req.body.code);
  try {
    apartment = await Apartment.findOne({ code: req.body.code });
  } catch (err) {
    res.status(400).send("Error finding apartment.");
  }

  try {
    user = await User.findOneAndUpdate(
      { email: req.session.user.email },
      { apartment: apartment._id },
      { new: true }
    );
  } catch (err) {
    res.status(400).send("Error adding information to user.");
  }
  req.session.user = user;
  res.status(201).json("Success");
});

/**
 * Route for retrieving a user's apartment.
 * @name get/get_apartment
 * @function
 * @memberof module:routes/apartment~apartmentRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {Apartment} Apartment found.
 */

router.get("/get_apartment", async function(req, res) {
  let apartment;
  try {
    let apartment = await Apartment.findById(req.session.user.apartment);
  } catch (err) {
    res.status(400).send("Error finding apartment.");
  }
  res.status(200).json(apartment);
});

/**
 * Route for editing an apartment.
 * @name post/edit
 * @function
 * @memberof module:routes/apartment~apartmentRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success".
 */

router.post("/edit", async function(req, res) {
  try {
    let oldApartment = await Apartment.findById(req.session.user.apartment);
  } catch (err) {
    res.status(400).send("Error finding apartment in database.");
  }

  let updatedApartment = {
    name: req.body.name != null ? req.body.name : oldApartment.name,
    address: req.body.address != null ? req.body.address : oldApartment.address
  };
  try {
    let newApartment = await Apartment.findByIdAndUpdate(
      req.user.apartment,
      updatedApartment,
      { new: true }
    );
  } catch (err) {
    res.status(400).send("Error editing chore item.");
  }
  res.status(201).send("Success");
});

module.exports = router;

