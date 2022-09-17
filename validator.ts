import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerValidate = (usr: any) => registerSchema.validate(usr);
const loginValidate = (usr: any) => loginSchema.validate(usr);

export { registerValidate, loginValidate };
