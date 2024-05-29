import Joi from "joi";

const loginSchema = Joi.object()
  .keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    secretCode: Joi.string().min(4).max(6).required(),
  })
  .strict();

export default loginSchema;
