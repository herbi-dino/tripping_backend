import { Request, Response } from "express";

const verifyToken = function (req: Request, res: Response, next: Function) {
  const tk = req.header("auth-token");
  if (!tk) {
    return res.status(401).send("Access Denied");
  }

  try {
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default verifyToken;
