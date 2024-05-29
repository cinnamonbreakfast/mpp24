import Joi from "joi";

const registerSchema = Joi.object()
  .keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    fullName: Joi.string().min(10).required(),
    secretCode: Joi.string().min(4).max(6).required(),
  })
  .strict();

export default registerSchema;
