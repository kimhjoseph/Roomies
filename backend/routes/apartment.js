const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Apartment = require("../models/Apartment");

//
// create_apartment (get)
// join_apartment (post)
// get_apartment (get)
// edit_apartment (post)

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
 * Create a new Apartment.
 *
 * Use axios.get(.../apartment/create_apartment, newApartment)
 *
 * @return res contining the apartment object created.
 */

 router.get('/create', async function(req, res) {
  let apartment;
  let user;

  try { apartment = await Apartment.create({ code: makeId() }); } 
  catch(err) { res.status(400).send("Error creating apartment."); }

  try { user = await User.findOneAndUpdate({ email: req.session.user.email }, { apartment: apartment._id }, { new: true }); } 
  catch(err) { res.status(400).send("Error adding information to user."); }
  req.session.user = user;
  res.status(200).send(apartment.code);
});

/**
 * Join an apartment.
 *
 * Use axios.post(.../apartment/join_apartment, code)
 *
 * @param req contains the code of the apartment to be joined.
 * @return user opject with udpated apartment field on completion
 */

 router.post('/join', async function(req, res) {
  let apartment;
  let user;

  try { apartment = await Apartment.findOne({ code: req.body.code }); } 
  catch(err) { res.status(400).send("Error finding apartment."); }

  try { user = await User.findOneAndUpdate({ email: req.session.user.email }, { apartment: apartment._id }, { new: true }); } 
  catch(err) { res.status(400).send("Error adding information to user."); }
  req.session.user = user;
  res.status(201).send("Success");
});

/**
 * Retrieve an apartment of a user.
 *
 * Use axios.get(.../apartment/get_apartment)
 *
 * @param req contains the user session variable
 * @return res continaing the retrieved Apartment object.
 */

router.get('/get_apartment', async function(req, res) {
  let apartment;
  try { let apartment = await Apartment.findById(req.session.user.apartment); } 
  catch(err) { res.status(400).send("Error finding apartment."); }
  res.status(200).json(apartment);
});

/**
 * Retrieve an apartment of a user.
 *
 * Use axios.post(.../apartment/edit_apartment, newApartment)
 *
 * @param req contains the user session variable and the newApartment object
 * @return res continaing the retrieved Apartment object.
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


