const Joi = require('joi');
const { objectId } = require('../../utils/validation');

const createEmployeeRole = {
  body: Joi.object().keys({
    role_id: Joi.number().integer().required(),
    employee_id: Joi.number().integer().required(),
  }),
};

const getEmployeeRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const queryEmployeeRoles = {
  query: Joi.object().keys({
    role_id: Joi.number().integer(),
    employee_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateEmployeeRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      role_id: Joi.number().integer(),
      employee_id: Joi.number().integer(),
    })
    .min(1),
};

const deleteEmployeeRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createEmployeeRole,
  queryEmployeeRoles,
  updateEmployeeRole,
  deleteEmployeeRole,
  getEmployeeRole,
};
