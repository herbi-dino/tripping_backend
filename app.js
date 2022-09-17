const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParse = require("body-parser");

const bookRoute = require("./routes/book");
const authRoute = require("./routes/auth");

require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParse.json());

app.use("/books", bookRoute);
app.use("/auth", authRoute);

mongoose.connect(process.env.DB_URI, () => {
  console.log(`[bookstore] connected to db: ${process.env.DB_URI}`);
});

app.listen(process.env.PORT, () => {
  console.log(`[bookstore] server up: ${process.env.PORT}`);
});
