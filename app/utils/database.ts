import mongoose from "mongoose";

import getConfig, { databaseUri } from "./config";
import log from "./logger";

const initDatabase = function () {
  mongoose.connect(getConfig(databaseUri), (err) => {
    if (!err) {
      log("connect db: success", getConfig(databaseUri));
      return;
    }

    log("connect db: failed", err);
  });
};

export default initDatabase;
