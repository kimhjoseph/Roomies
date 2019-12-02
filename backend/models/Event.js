const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Event = new Schema(
  {
    title: {
      type: String
    },
    frequency: {
      type: Number
    },
    location: {
      type: String
    },
    start: {
      type: String
    },
    end: {
      type: String
    },
    allDay: {
      type: Boolean
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment"
    }
  },
  {
    collection: "Events"
  }
);

module.exports = mongoose.model("Event", Event);
