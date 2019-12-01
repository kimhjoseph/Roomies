const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Apartment = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId
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
