import Joi from "joi";

const createSchema = Joi.object({
  owner: Joi.string().required(),
  title: Joi.string().required(),
  location: Joi.string().required(),
  numberOfPeople: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  transport: Joi.string().required(),
});

const createValidate = (trip: any) => createSchema.validate(trip);

export { createValidate as createTripValidate };
