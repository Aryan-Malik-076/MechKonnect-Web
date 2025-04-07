import { Router } from "express";

const router = Router();

router.get("/mechanic/:mechanicId", async (req, res) => {
  try {
    const { mechanicId } = req.params;
    // Simulated user location (replace with actual user data in a real app)
    const userLocation = { latitude: 33.7665, longitude: 72.3581 };
    // Simulated initial mechanic location (replace with stored data)
    let mechanicLocation = { latitude: 33.7730, longitude: 72.3605 };

    // Simulate movement (store this in a real app, e.g., in-memory or DB)
    mechanicLocation.latitude += (userLocation.latitude - mechanicLocation.latitude) * 0.05;
    mechanicLocation.longitude += (userLocation.longitude - mechanicLocation.longitude) * 0.05;

    res.status(200).json({
      mechanicId,
      location: mechanicLocation,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching mechanic location", error: error.message });
  }
});

export default router;