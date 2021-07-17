const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEmployee = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().required().email(),
    role_id: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const getEmployee = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const queryEmployee = {
  query: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string(),
    country: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateEmployee = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string(),
      country: Joi.string(),
      role_id: Joi.string(),
    })
    .min(1),
};

const deleteEmployee = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createEmployee,
  queryEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  login,
};
