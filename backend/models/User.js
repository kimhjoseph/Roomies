const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema(
  {
    first_name: {
      type: String
    },

    last_name: {
      type: String
    },

    email: {
      type: String
    },

    password: {
      type: String
    },

    status: {
      type: String,
      enum: ["Busy", "Away", "At Home", "Asleep"],
      default: "At Home"
    },

    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment"
    },

    picture: {
      type: Object
    }
  },
  {
    collection: "Users"
  }
);

module.exports = mongoose.model("User", User);