import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read spare parts data from JSON file
const sparePartsFilePath = path.join(__dirname, "../spareParts.json");
const sparePartsData = JSON.parse(fs.readFileSync(sparePartsFilePath, "utf-8"));

// GET API for Spare Parts
router.get("/", (req, res) => {
  res.json(sparePartsData);
});

export default router;
