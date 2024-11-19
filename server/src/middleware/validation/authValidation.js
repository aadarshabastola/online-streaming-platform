const Joi = require("joi");
const AppError = require("../../errors/AppError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new AppError(
        "INVALID_REQUEST_BODY",
        error.details.map((detail) => detail.message).join(", "),
        400
      );
    }
    next();
  };
};

const schemas = {
  register: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  validateRegister: validate(schemas.register),
  validateLogin: validate(schemas.login),
};
