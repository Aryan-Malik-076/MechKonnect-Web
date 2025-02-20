import Mechanic from "../models/Mechanic.js";

// ✅ Get all mechanics
export const getAllMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch mechanics" });
  }
};

// ✅ Get nearby mechanics
export const getNearbyMechanics = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  try {
    const mechanics = await Mechanic.find();
    // Simple filtering logic (you can improve with geospatial queries)
    const nearbyMechanics = mechanics.filter((mechanic) => {
      const distance = Math.sqrt(
        Math.pow(mechanic.latitude - lat, 2) + Math.pow(mechanic.longitude - lon, 2)
      );
      return distance < 0.5; // Example threshold for "nearby"
    });

    res.json(nearbyMechanics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nearby mechanics" });
  }
};
