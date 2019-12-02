/** Express router providing user related routes
 * @module routes/user
 * @requires express
 */

/**
 * express module
 * @const
 */

const express = require("express");



/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace userRouter
 */

const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Apartment = require("../models/Apartment");
var bcrypt = require("bcryptjs");




/**
 * Route for user signup.
 * @name post/signup
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success"
 */

router.post('/signup', async function(req, res) {
    let user;
    try {
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password, 
            picture: new ObjectId('5de4cfbf7101f652deee8410')
        });
    }
    catch(err) {res.status(400).send(err);}
    req.session.user = user;
    res.status(201).send("Success");
});


/**
 * Route for user login.
 * @name post/login
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success"
 */

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


/**
 * Route for user logout to clear session variable.
 * @name post/logout
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success"
 */

router.post("/logout", function(req, res) {
  res.clearCookie("user_sid");
});


/**
 * Route for editing user information.
 * @name post/edit_info
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success"
 */

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
    status: req.body.status != null ? req.body.status : req.session.user.status,
    profile_image: req.body.profile_image != null ? req.body.profile_image : "dummy image"
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
 * Route for getting all users of an apartment.
 * @name get/get
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {List<User>} List of users found.
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


/**
 * Route for getting the current user.
 * @name get/get_current_user
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {ObjectID} Id of the user.
 */

router.get("/get_current_user", function(req, res) {
  res.status(200).json(req.session.user);
});


/**
 * Route for adding a profile picture.
 * @name post/add_image
 * @function
 * @memberof module:routes/user~userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {User} the updated user object.
 */

router.post('/add_image', async function(req, res){
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
})

module.exports = router;

