import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  trip: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  review: { type: String, required: true },
  destinations: { type: [String] },
});

export default mongoose.model("Schedule", scheduleSchema);
