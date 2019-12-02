const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Apartment = require("../models/Apartment");
var bcrypt = require("bcryptjs");

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

router.post("/signup", async function(req, res) {
  let user;
  try {
    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      picture: new ObjectId("5de4cfbf7101f652deee8410")
    });
  } catch (err) {
    res.status(400).send(err);
  }
  req.session.user = user;
  res.status(201).send("Success");
});

router.post("/login", async function(req, res) {
  console.log(req.body);
  var email = req.body.email,
    password = req.body.password;

  let user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).send("Failure");
  } else if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.status(400).send("Failure");
  } else {
    req.session.user = user;
    console.log(req.session.user);
    res.status(201).send("Success");
  }
});

router.post("/logout", function(req, res) {
  res.clearCookie("user_sid");
});

router.post("/edit_info", async function(req, res) {
  let updatedData = {
    first_name:
      req.body.firstname != null
        ? req.body.firstname
        : req.session.user.first_name,
    last_name:
      req.body.lastname != null
        ? req.body.lastname
        : req.session.user.last_name,
    email: req.body.email != null ? req.body.email : req.session.user.email,
    status: req.body.status != null ? req.body.status : req.session.user.status
  };

  let user;
  try {
    user = await User.findOneAndUpdate(
      { email: req.session.user.email },
      updatedData,
      { new: true }
    );
  } catch (err) {
    console.log("Error updating user.");
    res.status(400).send(err);
  }
  req.session.user = user;
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

router.get("/get", async function(req, res) {
  let users;
  console.log(req.session.user);
  try {
    users = await User.find({ apartment: req.session.user.apartment });
  } catch (err) {
    console.log("Error finding users in database.");
    res.status(400).send(err);
  }
  res.status(200).json(users);
});

router.get("/get_current_user", function(req, res) {
  res.status(200).json(req.session.user);
});

router.post("/add_image", async function(req, res) {
  let file;
  let user;
  let id;
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: new ObjectId(req.session.user._id) },
    { picture: new ObjectId(req.body.img_id) },
    { new: true }
  )
    .then(user => {
      req.session.user = user;
      console.log(req.session.user);
      console.log("Successfully changed picture");
      res.status(200).json(users);
    })
    .catch(err => res.status(400).json("Error: " + err));

  console.log(req.session.user);
});

module.exports = router;
