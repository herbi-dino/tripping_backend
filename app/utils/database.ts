import mongoose from "mongoose";

import getConfig, { databaseUri } from "./config";

const initDatabase = function () {
  mongoose.connect(getConfig(databaseUri), (err) => {
    if (!err) {
      console.log("[tripping] connect db: success -", getConfig(databaseUri));
      return;
    }

    console.log("[tripping] connect db: failed -", err);
  });
};

export default initDatabase;
