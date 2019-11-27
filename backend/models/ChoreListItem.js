const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ChoreListItem = new Schema(
  {
    description: {
      type: String
    },
    completed: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment"
    },
    created: {
      type: Date,
      default: Date.now
    },
    days: {
      type: Number
    }
  },
  {
    collection: "ChoreListItems"
  }
);

module.exports = mongoose.model("ChoreListItem", ChoreListItem);
