import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  passengers: { type: Number, required: true },
  speed: { type: String, required: true }
});

const Workshop = mongoose.model("Workshop", WorkshopSchema);

export default Workshop;
