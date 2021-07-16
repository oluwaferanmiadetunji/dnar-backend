const Joi = require('joi');
const { objectId } = require('../../utils/validation');

const createEmployee = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    country: Joi.string(),
    email: Joi.string().required().email(),
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
