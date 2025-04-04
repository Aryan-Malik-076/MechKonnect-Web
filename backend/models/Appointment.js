const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  workshop: { type: String, required: true },
  workshopId: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "pending" }, // Add this
});

module.exports = mongoose.model("Appointment", appointmentSchema);