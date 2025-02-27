const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("spare_part_payments", PaymentSchema);
