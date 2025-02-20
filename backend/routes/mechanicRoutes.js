import { Router } from "express";
import Mechanic from "../models/Mechanic.js"; // ✅ Import the Mongoose model

const router = Router();

// Get all mechanics
router.get("/", async (req, res) => {
  try {
    const mechanics = await Mechanic.find(); // ✅ Fetch from DB
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get nearby mechanics based on coordinates
router.get("/nearby", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ message: "Latitude and Longitude are required" });
  }

  try {
    const mechanics = await Mechanic.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lon), parseFloat(lat)] },
          $maxDistance: 5000, // 5km range
        },
      },
    });

    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nearby mechanics", error });
  }
});

export default router;
