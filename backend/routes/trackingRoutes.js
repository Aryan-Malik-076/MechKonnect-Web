import express from "express";

const router = express.Router();

// Example tracking route
router.get("/", (req, res) => {
  res.json({ message: "Tracking route is working!" });
});

export default router;
