import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sparePartsRoutes from "./routes/spareParts.js";
import workshopRoutes from "./routes/workshopRoutes.js";
import mechanicRoutes from "./routes/mechanicRoutes.js"; // ✅ Mechanic routes

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/spareParts", sparePartsRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/mechanics", mechanicRoutes); // ✅ Added mechanics API

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
