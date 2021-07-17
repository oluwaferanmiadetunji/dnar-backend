const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const EmployeeService = require('../services/employees');
const EmployeeRoleService = require('../services/employeeRoles');
const EmployeeProjectService = require('../services/employeeProjects/service');

const createEmployee = catchAsync(async (req, res) => {
  const { first_name, last_name, country, email, role_id } = req.body;
  const exists = await EmployeeService.getEmployeeByEmail(email);
  if (exists) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Employee created already');
  }

  const employee = await EmployeeService.addEmployeeToDataBase({ first_name, last_name, country, email });
  await EmployeeRoleService.createEmployeeRole({ role_id, employee_id: employee.id });
  res.status(httpStatus.CREATED).send(employee);
});

const login = catchAsync(async (req, res) => {
  let employee = await EmployeeService.getEmployeeByEmail(req.body.email);
  if (!employee) {
    employee = await EmployeeService.addEmployeeToDataBase(req.body);
  }
  res.status(httpStatus.OK).send(employee);
});

const queryEmployee = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['first_name', 'last_name', 'email', 'country']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await EmployeeService.queryEmployees(filter, options);
  res.send(result);
});

const getEmployee = catchAsync(async (req, res) => {
  const employeeID = req.params.id;

  let employeeData = {};
  const employee = await EmployeeService.getEmployeeById(employeeID);
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }
  employeeData.data = employee;

  const role = await EmployeeRoleService.getEmployeeRoleByEmployeeId(employeeID);
  employeeData.role = role.role_id;

  const projects = await EmployeeProjectService.getEmployeeProjectsByEmployeeId(employeeID);

  employeeData.projects = projects;
  res.send(employeeData);
});

const updateEmployee = catchAsync(async (req, res) => {
  const employee = await EmployeeService.updateEmployeeById(req.params.id, req.body);
  res.send(employee);
});

const deleteEmployee = catchAsync(async (req, res) => {
  await EmployeeService.deleteEmployeeById(req.params.id);
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
