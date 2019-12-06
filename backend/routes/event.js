/** Express router providing event related routes
 * @module routes/event
 * @requires express
 */

/**
 * express module
 * @const
 */

const express = require("express");

/**
 * Express router to mount event related functions on.
 * @type {object}
 * @const
 * @namespace eventRouter
 */

const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Event = require("../models/Event");
const Apartment = require("../models/Apartment");

/**
 * Route for creating an event.
 * @name post/add
 * @function
 * @memberof module:routes/event~eventRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {ObjectID} Id of event created.
 */

router.post("/add", async function(req, res) {
  let userIds = [];
  let requests = req.body.users.map(async user => {
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
      let event = await Event.create({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        users: userIds,
        apartment: req.session.user.apartment
      });
      res.status(201).send(event._id);
    })
    .catch(() => {
      res.status(400).send("Error creating calendar event.");
    });
});
/**
 * Route for deleting an event.
 * @name delete/delete_item
 * @function
 * @memberof module:routes/event~eventRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {string} "Successfully deleted event!".
 */

router.delete("/delete_item/:id", async function(req, res) {
  try {
    await Event.deleteOne({ _id: req.params.id });
  } catch (err) {
    res.status(400).send("Error deleting event.");
  }
  res.status(200).send("Successfully deleted event!");
});

/**
 * Route for retrieving events of an apartment.
 * @name get/get
 * @function
 * @memberof module:routes/event~eventRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @return {List<Apartment>} List of events found.
 */

router.route("/get").get((req, res) => {
    Event.find({ apartment: req.session.user.apartment })
      .populate("users")
      .then(events => {
        let populatedEvents = [];
        events.forEach(event => {
          let names = [];
          event.users.forEach(user => {
            names.push(user.first_name + " " + user.last_name);
          });
          populatedEvents.push({
            title: event.title,
            start: event.start,
            end: event.end,
            users: names,
            eventId: event._id 
          });
        });
        res.status(200).json(populatedEvents);
      })
      .catch(error => res.status(400).json("Error: " + error));
  });

module.exports = router;