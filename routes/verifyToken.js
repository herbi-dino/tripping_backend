const jwt = require("jsonwebtoken");

require("dotenv/config");

const verifyToken = function (req, res, next) {
  const tk = req.header("auth-token");
  if (!tk) {
    return res.status(401).send("Access Denied");
  }

  try {
    req.user = jwt.verify(tk, process.env.JWT_TOKEN);

    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;
