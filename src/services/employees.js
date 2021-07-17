const httpStatus = require('http-status');
const Model = require('../models/employees');
const ApiError = require('../utils/ApiError');

/**
 * Add an employee to the database
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const addEmployeeToDataBase = async (body) => {
  if (await Model.isEmailTaken(body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const employee = await Model.create(body);
  return employee;
};

/**
 * Get all employees
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEmployees = async (filter, options) => {
  const employees = await Model.paginate(filter, options);
  return employees;
};

/**
 * Get an employee by id
 * @param {ObjectId} id
 * @returns {Promise<Model>}
 */
const getEmployeeById = async (id) => {
  return Model.findById(id);
};

/**
 * Get anll employees
 * @returns {Promise<Model>}
 */
const getEmployees = async (id) => {
  return Model.find({ id });
};

/**
 * Get an employee by email
 * @param {string} email
 * @returns {Promise<Model>}
 */
const getEmployeeByEmail = async (email) => {
  return Model.findOne({ email }).exec();
};

/**
 * Update employee by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const updateEmployeeById = async (id, body) => {
  const employee = await getEmployeeById(id);

  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  if (body.email && (await Model.isEmailTaken(body.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  Object.assign(employee, body);

  await employee.save();
  return employee;
};

/**
 * Delete employee by id
 * @param {ObjectId} id
 * @returns {Promise<Model>}
 */
const deleteEmployeeById = async (id) => {
  const employee = await getEmployeeById(id);
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }
  await employee.remove();
  return employee;
};

module.exports = {
  addEmployeeToDataBase,
  queryEmployees,
  getEmployeeById,
  getEmployeeByEmail,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployees,
};
