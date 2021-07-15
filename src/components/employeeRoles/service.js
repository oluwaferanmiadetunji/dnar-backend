const httpStatus = require('http-status');
const Model = require('./model');
const ApiError = require('../../utils/ApiError');

/**
 * Create an employee role
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const createEmployeeRole = async (body) => {
  const employeeRole = await Model.create(body);
  return employeeRole;
};

/**
 * Get all employee roles
 * @returns {Promise<QueryResult>}
 */
const queryEmployeeRoles = async () => {
  const employeeRoles = await Model.find({});
  return employeeRoles;
};

/**
 * Get an employee role by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const getEmployeeRoleById = async (id) => {
  return Model.findById(id);
};

/**
 * Delete employee role by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const deleteEmployeeRolesById = async (id) => {
  const employeeRole = await getEmployeeRoleById(id);
  if (!employeeRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Role not found');
  }
  await employeeRole.remove();
  return employeeRole;
};

module.exports = {
  createEmployeeRole,
  queryEmployeeRoles,
  getEmployeeRoleById,
  deleteEmployeeRolesById,
};
