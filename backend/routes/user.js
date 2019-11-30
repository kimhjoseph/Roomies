const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Apartment = require("../models/Apartment");
var bcrypt = require('bcrypt');

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

router.post('/signup', async function(req, res) {
    let user;
    try {
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
    }
    catch(err) {res.status(400).send(err);}
    req.session.user = user;
    res.status(201).send("Success");
});


router.post('/login', async function(req, res) {

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

router.post('/logout', function(req, res) {
  res.clearCookie('user_sid');
});

router.post("/edit_info", async function(req, res) {

  let updatedData = {
    first_name: req.body.firstname != null ? req.body.firstname : "Joseph",
    last_name: req.body.lastname != null ? req.body.lastname : "Kim",
    email: req.body.email != null ? req.body.email : "jhk.joseph@gmail.com",
    status: req.body.status != null ? req.body.status : "Busy",
    profile_image: req.body.profile_image != null ? req.body.profile_image : "dummy image"
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
  try {
    let users = await User.find({ apartment: req.user.apartment }).toArray();
  } catch (err) {
    console.log("Error finding users in database.");
    res.status(400).send(err);
  }
  res.status(200).json(users);
});

// test get hard coded
router.route("/get").get((req, res) => {
  console.log(req.session.user);
  User.find({ apartment: new ObjectId("5ddecc7a1c9d4400000141dd") })
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;


/* This is the new file structure from backend with login capabilities!


// going to leave this in here bc I don't know how we want to handle
// logging user out if session exceeds max session length
router.get('/dashboard', function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/dashboard.html');
    } else {
        res.redirect('/login');
    }
});


// route for user logout
router.get('/logout', function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

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

*/
