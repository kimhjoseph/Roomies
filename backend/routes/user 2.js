const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Apartment = require("../models/Apartment");

//
// edit_info (post)
// get_users (get)

/**
 * Edits user information.
 *
 * Use axios.post(.../user/edit_info, newUser)
 *
 * @param req contains the newUser object which contains first_name, last_name, email, status
 * @return            "Success"
 */

router.post("/edit_info", async function(req, res) {
  let updatedData = {
    first_name: req.body.first_name != null ? req.body.first_name : "Joseph",
    last_name: req.body.last_name != null ? req.body.last_name : "Kim",
    email: req.body.email != null ? req.body.email : "jhk.joseph@gmail.com",
    status: req.body.status != null ? req.body.status : "Busy"
  };

  let user;
  try {
    user = await User.findOneAndUpdate({ email: "jhk.joseph@gmail.com" }, updatedData, { new: true });
  } catch (err) {
    console.log("Error updating user.");
    res.status(400).send(err);
  }
  res.status(201).send("Success");
});

/**
 * Get relevant users.
 *
 * Use axios.get(.../user/get_users, newUser)
 *
 * @param req contains session user variable
 * @return array of matching User objects found
 */

router.get("/get_users", async function(req, res) {
  let users;
  try {
    users = await User.find({ apartment: "5ddecc7a1c9d4400000141dd" });
  } catch (err) {
    console.log("Error finding users in database.");
    res.status(400).send(err);
  }
  res.status(200).json(users);
});

module.exports = router;
