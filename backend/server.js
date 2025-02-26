import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sparePartsRoutes from "./routes/spareParts.js";
import workshopRoutes from "./routes/workshopRoutes.js";
import mechanicRoutes from "./routes/mechanicRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // ✅ Payment route added

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection with Error Handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit process on DB connection failure
  }
};

connectDB();

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/spareParts", sparePartsRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/payment", paymentRoutes); // ✅ Payment API route included

// ✅ Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
