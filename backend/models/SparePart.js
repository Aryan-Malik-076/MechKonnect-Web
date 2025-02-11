

const mongoose = require("mongoose");

const SparePartSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  discount: Number,
  passengers: Number,
  speed: String,
});

module.exports = mongoose.model("SparePart", SparePartSchema);
