const mongoose = require("mongoose");
const placeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Place = mongoose.model("places", placeSchema);
