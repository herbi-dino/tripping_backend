import * as dotenv from "dotenv";

dotenv.config();

const dbUri = process.env["DB_URI"]!;
const port = process.env["PORT"]!;
const accessTokenSecret = process.env["ACCESS_TOKEN_SECRET"]!;
const refreshTokenSecret = process.env["REFRESH_TOKEN_SECRET"]!;

export { dbUri, port, accessTokenSecret, refreshTokenSecret };
