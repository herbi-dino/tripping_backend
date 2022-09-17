import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  author: { type: String, require: true },
  price: { type: Number, require: true },
  publishDate: { type: Date, default: Date.now },
});

export default mongoose.model("Book", BookSchema);
