import express from "express";
import Workshop from "../models/Workshop.js";

const router = express.Router();

// **GET all workshops**
router.get("/", async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// **POST - Add new workshop**
router.post("/", async (req, res) => {
  try {
    const newWorkshop = new Workshop(req.body);
    await newWorkshop.save();
    res.status(201).json({ message: "Workshop added", newWorkshop });
  } catch (error) {
    res.status(400).json({ message: "Error saving workshop", error });
  }
});

// **DELETE - Remove a workshop**
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkshop = await Workshop.findByIdAndDelete(id);

    if (!deletedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json({ message: "Workshop deleted", deletedWorkshop });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
