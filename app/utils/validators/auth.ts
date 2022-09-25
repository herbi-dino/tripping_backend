import Joi from "joi";

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signupValidate = (usr: any) => signupSchema.validate(usr);
const loginValidate = (usr: any) => loginSchema.validate(usr);

export { signupValidate, loginValidate };
