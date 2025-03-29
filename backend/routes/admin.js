import express from "express";
import { adminAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Get all users (admin only)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get admin dashboard data
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    
    // Add more dashboard data as needed
    const dashboardData = {
      userCount,
      // Add other metrics here
    };
    
    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete user (admin only)
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    
    await user.remove();
    res.json({ msg: "User removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;