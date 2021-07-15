const httpStatus = require('http-status');
const Model = require('./model');
const ApiError = require('../../utils/ApiError');

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
 * @returns {Promise<QueryResult>}
 */
const queryEmployees = async () => {
  const employees = await Model.find({}, 'first_name last_name email country').exec();
  return employees;
};

/**
 * Get an employee by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const getEmployeeById = async (id) => {
  return Model.findById(id).exec();
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
 * @param {Number} id
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
 * @param {Number} id
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
};
