const Joi = require('joi');
const { objectId } = require('../../utils/validation');

const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const queryProjects = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

const deleteProject = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createProject,
  queryProjects,
  updateProject,
  deleteProject,
  getProject,
};
