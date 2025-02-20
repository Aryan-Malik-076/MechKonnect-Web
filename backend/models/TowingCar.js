const mongoose = require("mongoose");

const TowingCarSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
});

module.exports = mongoose.model("TowingCar", TowingCarSchema);
