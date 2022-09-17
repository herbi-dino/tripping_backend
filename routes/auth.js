const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidate, loginValidate } = require("../validator");

const User = require("../models/User");

require("dotenv/config");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(`[bookstore] register: ${JSON.stringify(req.body)}`);

  const { error } = registerValidate(req.body);
  if (error != undefined) {
    return res.status(400).json(error);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);

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

router.post("/login", async (req, res) => {
  console.log(`[bookstore] login: ${JSON.stringify(req.body)}`);

  const { error } = loginValidate(req.body);
  if (error != undefined) {
    return res.status(400).json(error);
  }

  const accExists = await User.findOne({ email: req.body.email });
  if (!accExists) {
    return res.send("account does not exist");
  }

  const checkPw = await bcrypt.compare(req.body.password, accExists.password);
  if (!checkPw) {
    return res.send("password is incorrect");
  }

  const tk = jwt.sign({ _id: accExists._id }, process.env.JWT_TOKEN);

  res.json({ token: tk });
});

module.exports = router;
