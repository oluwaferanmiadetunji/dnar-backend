const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const Service = require('./service');

const createEmployee = catchAsync(async (req, res) => {
  const employee = await Service.addEmployeeToDataBase(req.body);
  res.status(httpStatus.CREATED).send(employee);
});

const login = catchAsync(async (req, res) => {
  const employee = await Service.getEmployeeByEmail(req.body.email);
  res.status(httpStatus.OK).send(employee);
});

const queryEmployee = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['first_name', 'last_name', 'email', 'country']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await Service.queryEmployees(filter, options);
  res.send(result);
});

const getEmployee = catchAsync(async (req, res) => {
  const employee = await Service.getEmployeeById(req.params.id);
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }
  res.send(employee);
});

const updateEmployee = catchAsync(async (req, res) => {
  const employee = await Service.updateEmployeeById(req.params.id, req.body);
  res.send(employee);
});

const deleteEmployee = catchAsync(async (req, res) => {
  await Service.deleteEmployeeById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEmployee,
  queryEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  login,
};
