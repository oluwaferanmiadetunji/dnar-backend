const Joi = require('joi');
const { objectId } = require('../../utils/validation');

const createEmployeeProject = {
  body: Joi.object().keys({
    project_id: Joi.any().required(),
    employee_id: Joi.any().required(),
  }),
};

const getEmployeeProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const queryEmployeeProjects = {
  query: Joi.object().keys({
    project_id: Joi.any(),
    employee_id: Joi.any(),
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
      project_id: Joi.any(),
      employee_id: Joi.any(),
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
