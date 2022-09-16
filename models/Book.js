const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  author: { type: String, require: true },
  price: { type: Number, require: true },
  publishDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", BookSchema);
