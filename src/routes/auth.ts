import { compare, genSalt, hash } from "bcryptjs";
import { Router } from "express";
import { sign } from "jsonwebtoken";

import User from "../models/User";
import { loginValidate, registerValidate } from "../utils/validator";

const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  console.log(`[tripping] register: ${JSON.stringify(req.body)}`);

  const { error } = registerValidate(req.body);
  if (error != undefined) {
    return res.status(400).json(error);
  }

  const salt = await genSalt(10);
  const hashedPw = await hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPw,
  });

  user
    .save()
    .then((mgRes) => res.json(mgRes))
    .catch((err) => res.json(err));
});

authRoute.post("/login", async (req, res) => {
  console.log(`[tripping] login: ${JSON.stringify(req.body)}`);

  const { error } = loginValidate(req.body);
  if (error != undefined) {
    return res.status(400).json(error);
  }

  const accExists = await User.findOne({ email: req.body.email });
  if (!accExists) {
    return res.send("account does not exist");
  }

  const checkPw = await compare(req.body.password, accExists.password);
  if (!checkPw) {
    return res.send("password is incorrect");
  }

  const tk = sign({ _id: accExists._id }, process.env["JWT_TOKEN"] || "");

  res.json({ token: tk });
});

export default authRoute;
