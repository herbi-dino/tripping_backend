const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const registerValidate = (usr) => registerSchema.validate(usr);
const loginValidate = (usr) => loginSchema.validate(usr);

module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
