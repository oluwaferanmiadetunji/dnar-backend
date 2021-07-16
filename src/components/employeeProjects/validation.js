const Joi = require('joi');
const { objectId } = require('../../utils/validation');

const createEmployeeProject = {
  body: Joi.object().keys({
    project_id: Joi.number().integer().required(),
    employee_id: Joi.number().integer().required(),
  }),
};

const getEmployeeProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const queryEmployeeProjects = {
  query: Joi.object().keys({
    project_id: Joi.number().integer(),
    employee_id: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateEmployeeProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      project_id: Joi.number().integer(),
      employee_id: Joi.number().integer(),
    })
    .min(1),
};

const deleteEmployeeProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createEmployeeProject,
  queryEmployeeProjects,
  updateEmployeeProject,
  deleteEmployeeProject,
  getEmployeeProject,
};
