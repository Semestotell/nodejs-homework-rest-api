const Joi = require("joi");

const addContactValidation = Joi.object({
  name: Joi.string().min(1).max(148).required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

const changeContactValidation = Joi.object({
  name: Joi.string().min(1).max(148).required(),
  email: Joi.string(),
  phone: Joi.string().min(9).max(18),
});

const updateStatusValidation = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  addContactValidation,
  updateStatusValidation,
  changeContactValidation,
};
