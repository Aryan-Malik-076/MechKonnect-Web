const express = require("express");
const router = express.Router();
const TowingCar = require("../models/TowingCar");
const towingCarsData = require("../data/towingCars.json");

// Seed database with initial data
router.get("/seed", async (req, res) => {
  try {
    await TowingCar.deleteMany();
    await TowingCar.insertMany(towingCarsData);
    res.json({ message: "Towing cars seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all towing cars
router.get("/", async (req, res) => {
  try {
    const towingCars = await TowingCar.find();
    res.json(towingCars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
