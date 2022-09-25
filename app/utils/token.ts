import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

import { failedResponse } from "../models/MyResponse";
import getConfig, { accessTokenSecret, refreshTokenSecret } from "./config";

const verifyToken = function (req: Request, res: Response, next: Function) {
  const tk = req.header("auth-token");
  if (!tk) {
    return res.status(401).json(failedResponse("Access Denied"));
  }

  try {
    const vrf = verify(tk, getConfig(accessTokenSecret));
    (req as any)["user"] = vrf;

    next();
  } catch (err: any) {
    res.status(403).json(failedResponse(err["message"]));
  }
};

const generateToken = function (user: any) {
  const accessTk = sign(user, getConfig(accessTokenSecret), {
    expiresIn: "15s",
  });

  const refreshTk = sign(user, getConfig(refreshTokenSecret));

  return { access: accessTk, refresh: refreshTk };
};

export { verifyToken, generateToken };
