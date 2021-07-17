const httpStatus = require('http-status');
const Model = require('../models/employee.projects');
const ApiError = require('../utils/ApiError');

/**
 * Create an employee project
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const createEmployeeProject = async (body) => {
  const employeeProject = await Model.create(body);
  return employeeProject;
};

/**
 * Get all employee projects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEmployeeProjects = async (filter, options) => {
  const employeeProjects = await Model.paginate(filter, options);
  return employeeProjects;
};

/**
 * Get an employee project by id
 * @param {String} id
 * @returns {Promise<Model>}
 */
const getEmployeeProjectById = async (id) => {
  return Model.findById(id);
};

/**
 * Get an employee role by employee id
 * @param {String} id
 * @returns {Promise<Model>}
 */
const getEmployeeProjectsByEmployeeId = async (id) => {
  return Model.find({ employee_id: id }, 'project_id').exec();
};

/**
 * Get an employee role by employee id and project id
 * @param {String} id
 * @returns {Promise<Model>}
 */
const getEmployeeProjectsByEmployeeIdAndProjectID = async (employee_id, project_id) => {
  return Model.findOne({ employee_id, project_id }).exec();
};

/**
 * Update employee project by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const updateEmployeeProjectById = async (id, body) => {
  const employeeProject = await getEmployeeProjectById(id);
  if (!employeeProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Project not found');
  }

  Object.assign(employeeProject, body);
  await employeeProject.save();
  return employeeProject;
};

/**
 * Delete employee project by id
 * @param {String} id
 * @returns {Promise<Model>}
 */
const deleteEmployeeProjectById = async (id) => {
  const employeeProject = await getEmployeeProjectById(id);
  if (!employeeProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Project not found');
  }
  await employeeProject.remove();
  return employeeProject;
};

module.exports = {
  createEmployeeProject,
  queryEmployeeProjects,
  getEmployeeProjectById,
  deleteEmployeeProjectById,
  updateEmployeeProjectById,
  getEmployeeProjectsByEmployeeId,
  getEmployeeProjectsByEmployeeIdAndProjectID,
};
