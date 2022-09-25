import { json } from "body-parser";
import cors from "cors";
import express from "express";

import getConfig, { port } from "./utils/config";
import initDatabase from "./utils/database";

const server = express();

server.use(json());
server.use(cors());

initDatabase();

server.listen(getConfig(port), () => {
  console.log("[tripping] server listen:", getConfig(port));
});
