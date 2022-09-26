import { json } from "body-parser";
import cors from "cors";
import express from "express";

import authRoute from "./routes/auth";
import tripRoute from "./routes/trip";
import getConfig, { port } from "./utils/config";
import initDatabase from "./utils/database";
import log from "./utils/logger";

const server = express();

server.use(json());
server.use(cors());

server.use("/auth", authRoute);
server.use("/trip", tripRoute);

initDatabase();

server.listen(getConfig(port), () => {
  log("server listen", getConfig(port));
});
