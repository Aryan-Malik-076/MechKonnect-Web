const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Create a new appointment
router.post("/", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
});

module.exports = router;