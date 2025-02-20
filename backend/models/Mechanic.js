import mongoose from "mongoose";

const mechanicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  recommendations: { type: Number, default: 0 },
  initialCharge: { type: Number, default: 300 },
});

// ✅ Ensure geospatial indexing for location
mechanicSchema.index({ location: "2dsphere" });

const Mechanic = mongoose.model("Mechanic", mechanicSchema);
export default Mechanic;
