/** Express router providing chore item related routes
 * @module routes/choreitem
 * @requires express
 */

/**
 * express module
 * @const
 */

const express = require("express");

/**
 * Express router to mount chore item related functions on.
 * @type {object}
 * @const
 * @namespace choreitemRouter
 */

const router = express.Router();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const ChoreListItem = require("../models/ChoreListItem");


/**
 * Function for calculating days remaining on a chore.
 * @name getDaysRemaining
 * @function
 * @memberof module:routes/shoppingitem~shoppingitemRouter
 * @inner
 * @param {Date} createdAt - Date created
 * @param {Number} days - Days to complete chore.
 * @return {Number} Days remaining to complete chore.
 */


function getDaysRemaining(createdAt, days) {
  createdAt.setDate(createdAt.getDate() + days);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = Date.now();

  const diffTime = createdAt - now;
  const diffDays = Math.ceil(diffTime / _MS_PER_DAY);
  return diffDays;
}



/**
 * Route for adding a chore item.
 * @name post/add
 * @function
 * @memberof module:routes/choreitem~choreitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} 'Success'.
 */


router.post("/add", async function(req, res) {
  var name = req.body.userName.split(" ");
  var userFirstName = name[0];
  var userLastName = name[1];
  let newUser;
  try {
    newUser = await User.findOne({
      first_name: userFirstName,
      last_name: userLastName,
      apartment: req.session.user.apartment
    });
  } catch (err) {
    res.status(400).send("Error finding user with that first and last name.");
  }

  let item;
  try {
    item = await ChoreListItem.create({
      description: req.body.description,
      user: newUser._id,
      apartment: req.session.user.apartment,
      days: req.body.days
    });
  } catch (err) {
    res.status(400).send("Error creating chore list item.");
  }
  res.status(201).send("Success");
});

/**
 * Route for editing a chore item.
 * @name post/edit
 * @function
 * @memberof module:routes/choreitem~choreitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} 'Success'.
 */

router.post("/edit/:id", async function(req, res) {
  let oldItem;
  try {
    oldItem = await ChoreListItem.findById(req.params.id);
  } catch (err) {
    res.status(400).send("Error finding item.");
  }

  let newUser;
  if (req.body.userName) {
    var name = req.body.userName.split(" ");
    var userFirstName = name[0];
    var userLastName = name[1];

    try {
      newUser = await User.findOne({
        first_name: userFirstName,
        last_name: userLastName
      });
    } catch (err) {
      res.status(400).send("Error finding user with that first and last name.");
    }
  }

  let updatedItem = {
    description:
      req.body.description != null ? req.body.description : oldItem.description,
    completed:
      req.body.completed != null ? req.body.completed : oldItem.completed,
    user: newUser != null ? newUser._id : oldItem.user,
    days: req.body.days != null ? req.body.days : oldItem.days
  };

  let newItem;
  try {
    newItem = await ChoreListItem.findByIdAndUpdate(
      req.params.id,
      updatedItem,
      { new: true }
    );
  } catch (err) {
    res.status(400).send("Error editing chore item.");
  }
  res.status(201).send("Success");
});

/**
 * Route for retrieving all chore item of an apartment.
 * @name get/get_all_items
 * @function
 * @memberof module:routes/choreitem~choreitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {List<ChoreListItem>} List of chores found.
 */

router.get("/get_all_items", async function(req, res) {
  ChoreListItem.find({ apartment: req.session.user.apartment })
    .populate("user")
    .then(chores => {
      let populatedItems = [];
      let name = "";
      chores.forEach(chore => {
        name = chore.user.first_name + " " + chore.user.last_name;
        var diffDays = getDaysRemaining(chore.created, chore.days);
        var id = chore.user._id;
        populatedItems.push({
          chore: chore.description,
          id: chore._id,
          user_id: id,
          user: name,
          days: diffDays
        });
      });
      res.status(200).json(populatedItems);
    })
    .catch(err => res.status(400).json("Error: " + err));
});


/**
 * Route for deleting a chore.
 * @name delete/delete_item
 * @function
 * @memberof module:routes/choreitem~choreitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Successfully deleted chore item!".
 */

router.delete("/delete_item/:id", async function(req, res) {
  try {
    await ChoreListItem.deleteOne({ _id: req.params.id });
  } catch (err) {
    res.status(400).send("Error deleting item.");
  }
  res.status(200).send("Successfully deleted chore item!");
});

/**
 * Route for deleting all chores of an apartment.
 * @name delete/delete_all_items
 * @function
 * @memberof module:routes/choreitem~choreitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Success!".
 */

router.delete("/delete_all_items", async function(req, res) {
  try {
    await ChoreListItem.deleteMany({ apartment: req.session.user.apartment });
  } catch (err) {
    res.status(400).send("Error clearing item list.");
  }
  res.status(200).send("Success");
});

/**
 * Route for retrieving all of a user's items.
 * @name get/get_my_items
 * @function
 * @memberof module:routes/choreitem~choreitemRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {List<ChoreListItem>} List of chores found.
 */

router.get("/get_my_items", async function(req, res) {
  ChoreListItem.find({ user: req.session.user._id })
    .then(myChores => {
      let populatedItems = [];
      myChores.forEach(chore => {
        var diffDays = getDaysRemaining(chore.created, chore.days);
        populatedItems.push({
          chore: chore.description,
          id: chore._id,
          days: diffDays
        });
      });
      res.json(populatedItems);
    })
    .catch(err => res.status(400).json("Error: " + err));
});


module.exports = router;
