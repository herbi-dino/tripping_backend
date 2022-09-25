import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  transport: { type: String, required: true },
  schedules: { type: [String] },
});

export default mongoose.model("Trip", tripSchema);
