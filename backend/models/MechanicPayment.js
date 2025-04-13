const mongoose = require('mongoose');

const mechanicPaymentSchema = new mongoose.Schema({
  mechanicName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'cash', 'digital'],
  },
  cardDetails: {
    cardNumber: String,
    expiryDate: String,
    cvv: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MechanicPayment', mechanicPaymentSchema);