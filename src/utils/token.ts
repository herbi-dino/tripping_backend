import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret } from "./config";

const verifyToken = function (req: Request, res: Response, next: Function) {
  const tk = req.header("auth-token");
  if (!tk) {
    return res.status(401).send("Access Denied");
  }

  try {
    verify(tk, process.env["JWT_TOKEN"]!);

    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const generateToken = function (user: any) {
  const accessTk = accessToken(user);
  const refreshTk = refreshToken(user);

  return { access: accessTk, refresh: refreshTk };
};

const accessToken = function (user: any) {
  return sign(user, accessTokenSecret, { expiresIn: "15s" });
};

const refreshToken = function (user: any) {
  return sign(user, refreshTokenSecret);
};

export { verifyToken, generateToken };
