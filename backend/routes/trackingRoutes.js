import express from "express";

const router = express.Router();

// Mock truck locations (for testing)
let truckLocations = [
  { id: 1, name: "Ali Towing", lat: 33.7738, lng: 72.3592, description: "Reliable roadside assistance." },
  { id: 2, name: "Kamran Towing", lat: 33.7745, lng: 72.3610, description: "Fast and secure towing service." },
  { id: 3, name: "Fast Tow", lat: 33.7760, lng: 72.3635, description: "24/7 roadside support." },
  { id: 4, name: "SafeRide Tow", lat: 33.7752, lng: 72.3652, description: "Affordable and professional." },
  { id: 5, name: "Quick Rescue", lat: 33.7780, lng: 72.3680, description: "Emergency towing experts." },
  { id: 6, name: "Road Hero", lat: 33.7895, lng: 72.3660, description: "We get you moving!" },
  { id: 7, name: "Trust Tow", lat: 33.7902, lng: 72.3695, description: "Your safety is our priority." },
  { id: 8, name: "Fast Assist", lat: 33.7910, lng: 72.3712, description: "Quick and efficient towing." },
  { id: 9, name: "SafeHaul", lat: 33.7925, lng: 72.3740, description: "Reliable towing for your vehicle." },
  { id: 10, name: "Elite Tow", lat: 33.7930, lng: 72.3770, description: "Premier roadside assistance." },
];

// Route to fetch truck locations
router.get("/", (req, res) => {
  res.json(truckLocations);
});

export default router;
