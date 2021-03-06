const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const EmployeeRoleService = require('../services/employee.roles');
const { Service: RoleService } = require('../services/roles');
const { Service: EmployeeService } = require('../services/employees');

const createEmployeeRole = catchAsync(async (req, res) => {
  const { role_id, employee_id } = req.body;

  // Check if Employee Exists
  const employee = await EmployeeService.getEmployeeById(employee_id);

  // If Employee doesn't exist, throw an error
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  // Check if role Exists
  const role = await RoleService.getRoleById(role_id);

  // If role doesn't exist, throw an error
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  // create employee-role
  const employeeRole = await EmployeeRoleService.createEmployeeRole(req.body);
  res.status(httpStatus.CREATED).send(employeeRole);
});

const queryEmployeeRoles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role_id', 'employee_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await EmployeeRoleService.queryEmployeeRoles(filter, options);
  res.send(result);
});

const getEmployeeRole = catchAsync(async (req, res) => {
  const employeeRole = await EmployeeRoleService.getEmployeeRoleById(req.params.id);
  if (!employeeRole) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Role not found');
  }
  res.send(employeeRole);
});

const updateEmployeeRole = catchAsync(async (req, res) => {
  // Check if Employeed ID is in request body
  if (req.body.employee_id) {
    // Check if Employee Exists
    const employee = await EmployeeService.getEmployeeById(req.body.employee_id);

    // If Employee doesn't exist, throw an error
    if (!employee) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
    }
  }

  // Check if Role ID is in request body
  if (req.body.role_id) {
    // Check if role Exists
    const role = await RoleService.getRoleById(req.body.role_id);

    // If role doesn't exist, throw an error
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
    }
  }
  // update employee-role
  const employeeRole = await EmployeeRoleService.updateEmployeeRoleById(req.params.id, req.body);
  
  res.send(employeeRole);
});

const deleteEmployeeRole = catchAsync(async (req, res) => {
  await EmployeeRoleService.deleteEmployeeRolesById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEmployeeRole,
  queryEmployeeRoles,
  getEmployeeRole,
  updateEmployeeRole,
  deleteEmployeeRole,
};
