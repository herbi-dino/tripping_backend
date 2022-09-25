import { json } from "body-parser";
import cors from "cors";
import express from "express";

import authRoute from "./routes/auth";
import tripRoute from "./routes/trip";
import getConfig, { port } from "./utils/config";
import initDatabase from "./utils/database";

const server = express();

server.use(json());
server.use(cors());

server.use("/auth", authRoute);
server.use("/trip", tripRoute);

initDatabase();

server.listen(getConfig(port), () => {
  console.log("[tripping] server listen:", getConfig(port));
});
