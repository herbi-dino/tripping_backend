import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  schedule: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

export default mongoose.model("Destination", destinationSchema);
