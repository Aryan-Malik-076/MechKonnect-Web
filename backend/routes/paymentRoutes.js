// Payment.js (routes)
const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Save Payment Details (existing)
router.post("/process-payment", async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv, productName, productPrice } = req.body;

    if (!cardNumber || !expiryDate || !cvv || !productName || !productPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPayment = new Payment({
      cardNumber,
      expiryDate,
      cvv,
      productName,
      productPrice,
    });

    await newPayment.save();
    res.status(200).json({ success: true, message: "Payment Successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Fetch All Payments (new)
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
});

module.exports = router;