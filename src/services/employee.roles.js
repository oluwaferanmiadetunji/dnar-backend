const httpStatus = require('http-status');
const Model = require('../models/employee.roles');
const ApiError = require('../utils/ApiError');
const RoleService = require('./roles');
const EmployeesService = require('./employees');

/**
 * Create an employee role
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const createEmployeeRole = async ({ role_id, employee_id }) => {
  const role = await RoleService.getRoleById(role_id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  const employee = await EmployeesService.getEmployeeById(employee_id);
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  const employeeRole = await Model.create({ role_id, employee_id });
  return employeeRole;
};

/**
 * Get all employee roles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEmployeeRoles = async (filter, options) => {
  const employeeRoles = await Model.paginate(filter, options);
  return employeeRoles;
};

/**
 * Get an employee role by id
 * @param {ObjectId} id
 * @returns {Promise<Model>}
 */
const getEmployeeRoleById = async (id) => {
  return Model.findById(id);
};

/**
 * Get an employee role by employee id
 * @param {ObjectId} id
 * @returns {Promise<Model>}
 */
const getEmployeeRoleByEmployeeId = async (id) => {
  return Model.findOne({ employee_id: id }, 'role_id').exec();
};

/**
 * Update employee role by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const updateEmployeeRoleById = async (id, body) => {
  const employeeRole = await getEmployeeRoleById(id);
  if (!employeeRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Role not found');
  }

  Object.assign(employeeRole, body);
  await employeeRole.save();
  return employeeRole;
};

/**
 * Update employee role by employee id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const updateEmployeeRoleByEmployeeId = async (id, body) => {
  let employeeRole = await getEmployeeRoleByEmployeeId(id);
  if (!employeeRole) {
    employeeRole = await Model.create(body);
  } else {
    Object.assign(employeeRole, body);
    await employeeRole.save();
  }

  return employeeRole;
};

/**
 * Delete employee role by id
 * @param {ObjectId} id
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
  updateEmployeeRoleById,
  getEmployeeRoleByEmployeeId,
  updateEmployeeRoleByEmployeeId,
};
