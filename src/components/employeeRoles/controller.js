const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const Service = require('./service');

const createEmployeeRole = catchAsync(async (req, res) => {
  const employeeRole = await Service.createEmployeeRole(req.body);
  res.status(httpStatus.CREATED).send(employeeRole);
});

const queryEmployeeRoles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role_id', 'employee_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await Service.queryEmployeeRoles(filter, options);
  res.send(result);
});

const getEmployeeRole = catchAsync(async (req, res) => {
  const employeeRole = await Service.getEmployeeRoleById(req.params.id);
  if (!employeeRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Role not found');
  }
  res.send(employeeRole);
});

const updateEmployeeRole = catchAsync(async (req, res) => {
  const employeeRole = await Service.updateEmployeeRoleById(req.params.id, req.body);
  res.send(employeeRole);
});

const deleteEmployeeRole = catchAsync(async (req, res) => {
  await Service.deleteEmployeeRolesById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEmployeeRole,
  queryEmployeeRoles,
  getEmployeeRole,
  updateEmployeeRole,
  deleteEmployeeRole,
};
