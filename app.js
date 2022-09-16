const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParse = require("body-parser");
const bookRoute = require("./routes/book");

require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParse.json());

app.use("/books", bookRoute);

mongoose.connect(process.env.DB_URI, () => {
  console.log("[bookstore] connected to db");
});

app.listen(3000);
