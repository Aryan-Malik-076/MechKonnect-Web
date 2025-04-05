import mongoose from "mongoose";

const paymentmSchema = new mongoose.Schema({
  mechanicName: { type: String, required: true },
  userId: { type: String }, // Optional: if you have user authentication
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["card", "cash"], required: true },
  cardDetails: {
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
  },
  timestamp: { type: Date, default: Date.now },
});

const Paymentm = mongoose.model("Paymentm", paymentmSchema);
export default Paymentm;