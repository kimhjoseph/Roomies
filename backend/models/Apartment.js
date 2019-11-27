const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Apartment = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId
    },
    name: {
      type: String
    },
    address: {
      type: String
    },
    code: {
      type: String
    }
  },
  {
    collection: "Apartments"
  }
);

module.exports = mongoose.model("Apartment", Apartment);
