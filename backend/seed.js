import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Mechanic from "./models/Mechanic.js";

dotenv.config();

const mechanicsData = JSON.parse(fs.readFileSync("./data/mechanics.json", "utf-8")); // ✅ Read JSON manually

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await Mechanic.deleteMany(); // Clear existing data
    await Mechanic.insertMany(mechanicsData); // Insert new data
    console.log("✅ Mechanics Seeded Successfully");
    mongoose.connection.close();
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
