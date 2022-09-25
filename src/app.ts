import { json } from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import bookRoute from "./routes/book";
import { dbUri, port } from "./utils/config";

const app = express();

app.use(json());
app.use(cors());

app.use("/books", bookRoute);
app.use("/auth", authRoute);

mongoose.connect(dbUri, (err) => {
  if (err != null) {
    console.log("[tripping] db connect failed:", err);
    return;
  }

  console.log(`[tripping] connected to db: ${dbUri}`);
});

app.listen(port, () => {
  console.log(`[tripping] server up: ${port}`);
});
