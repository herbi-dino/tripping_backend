import * as dotenv from "dotenv";

dotenv.config();

const port = "PORT";
const dbUri = "DB_URI";
const accessTkSecret = "ACCESS_TOKEN_SECRET";
const refreshTkSecret = "REFRESH_TOKEN_SECRET";

const getConfig = function (envVar: string) {
  return process.env[envVar]!;
};

export default getConfig;
export {
  port,
  dbUri as databaseUri,
  accessTkSecret as accessTokenSecret,
  refreshTkSecret as refreshTokenSecret,
};
