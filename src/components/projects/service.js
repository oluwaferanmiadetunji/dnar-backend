const httpStatus = require('http-status');
const Model = require('./model');
const ApiError = require('../../utils/ApiError');

/**
 * Add a project to the database
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const addProjectToDataBase = async (body) => {
  const project = await Model.create(body);
  return project;
};

/**
 * Get all projects
 * @returns {Promise<QueryResult>}
 */
const queryProjects = async () => {
  const projects = await Model.find({});
  return projects;
};

/**
 * Get a project by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const getProjectById = async (id) => {
  return Model.findById(id);
};

/**
 * Update project by id
 * @param {Number} id
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const updateProjectById = async (id, body) => {
  const project = await getProjectById(id);

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  Object.assign(project, body);

  await project.save();
  return project;
};

/**
 * Delete project by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const deleteProjectById = async (id) => {
  const project = await getProjectById(id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  addProjectToDataBase,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};