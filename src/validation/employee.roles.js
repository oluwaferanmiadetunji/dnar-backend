const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEmployeeRole = {
  body: Joi.object().keys({
    role_id: Joi.any().required(),
    employee_id: Joi.any().required(),
  }),
};

const getEmployeeRole = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const queryEmployeeRoles = {
  query: Joi.object().keys({
    role_id: Joi.any(),
    employee_id: Joi.any(),
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
      role_id: Joi.any(),
      employee_id: Joi.any(),
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
