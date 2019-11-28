const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ShoppingListItem = new Schema(
  {
    item: {
      type: String
    },
    description: {
      type: String,
      default: ""
    },
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment"
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    collection: "ShoppingListItems"
  }
);

module.exports = mongoose.model("ShoppingListItem", ShoppingListItem);
