import { json } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import bookRoute from "./routes/book";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());

app.use("/books", bookRoute);
app.use("/auth", authRoute);

const dbUri = process.env["DB_URI"]!;
mongoose.connect(dbUri, () => {
  console.log(`[bookstore] connected to db: ${dbUri}`);
});

const port = process.env["PORT"]!;
app.listen(port, () => {
  console.log(`[bookstore] server up: ${port}`);
});
