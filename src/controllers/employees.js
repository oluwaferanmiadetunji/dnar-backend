const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const EmployeeService = require('../services/employees');
const EmployeeRoleService = require('../services/employee.roles');
const EmployeeProjectService = require('../services/employee.projects');
const ProjectService = require('../services/projects');

const createEmployee = catchAsync(async (req, res) => {
  const { first_name, last_name, country, email, role_id } = req.body;

  // Check if employee already exists
  const employeeExists = await EmployeeService.getEmployeeByEmail(email);

  // If employee exists, throw an error
  if (employeeExists) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Employee created already');
  }

  // Else create employee
  const employee = await EmployeeService.addEmployeeToDataBase({ first_name, last_name, country, email });

  // Then create employee-role
  await EmployeeRoleService.createEmployeeRole({ role_id, employee_id: employee.id });

  res.status(httpStatus.CREATED).send(employee);
});

const login = catchAsync(async (req, res) => {
  // Check if employee exists
  let employee = await EmployeeService.getEmployeeByEmail(req.body.email);

  // If employee doesn't exist, create an employee
  if (!employee) {
    employee = await EmployeeService.addEmployeeToDataBase(req.body);
  }

  res.status(httpStatus.OK).send(employee);
});

const assignProjectToEmployee = catchAsync(async (req, res) => {
  const employee_id = req.params.id;
  const project_id = req.body.project_id;

  // Check if employee exists
  const employeeExists = await EmployeeService.getEmployeeById(employee_id);

  // If employee doesn't exist, throw an error
  if (!employeeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  // Check if project exists
  const projectExists = await ProjectService.getProjectById(project_id);

  // If project doesn't exist, throw an error
  if (!projectExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  // Check if employee was already assigned the project
  const hasAssignedProject = await EmployeeProjectService.getEmployeeProjectsByEmployeeIdAndProjectID(employee_id, project_id);

  // If employee has been assigned the project, throw an error
  if (hasAssignedProject) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Employee has been assigned project already');
  }

  // Else, assign project to employee
  const employeeProject = await EmployeeProjectService.createEmployeeProject({ employee_id, project_id });

  res.status(httpStatus.OK).send(employeeProject);
});

const removeProjectFromEmployee = catchAsync(async (req, res) => {
  const employee_id = req.params.id;
  const project_id = req.body.project_id;

  // Check if employee exists
  const employeeExists = await EmployeeService.getEmployeeById(employee_id);

  // If employee doesn't exist, throw an error
  if (!employeeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  // Check if project exists
  const projectExists = await ProjectService.getProjectById(project_id);

  // If project doesn't exist, throw an error
  if (!projectExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project does not exist');
  }

  // Check if employee was already assigned the project
  const hasAssignedProject = await EmployeeProjectService.getEmployeeProjectsByEmployeeIdAndProjectID(employee_id, project_id);

  // If employee was not assigned the project, throw an error
  if (!hasAssignedProject) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Employee was not assigned the project');
  }

  // Else, remove project from employee
  await EmployeeProjectService.deleteEmployeeProjectByEmployeeId(employee_id);

  res.status(httpStatus.NO_CONTENT).send();
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
  // Check if employee exists
  const employee = await EmployeeService.getEmployeeById(employeeID);

  // If employee doesn't exist, throw an error
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }
  employeeData.data = employee;

  // Check if role exists
  const role = await EmployeeRoleService.getEmployeeRoleByEmployeeId(employeeID);
  if (role) {
    employeeData.role = role.role_id;
  }

  // Check if employee has projects
  const projects = await EmployeeProjectService.getEmployeeProjectsByEmployeeId(employeeID);

  employeeData.projects = projects;
  res.send(employeeData);
});

const updateEmployee = catchAsync(async (req, res) => {
  const employee_id = req.params.id;
  const { first_name, last_name, country, role_id } = req.body;

  let employeeData = {};

  // Check if employee exists
  const employeeExists = await EmployeeService.getEmployeeById(employee_id);

  // if employee doesn't exist theow an error
  if (!employeeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee does not exist');
  }

  // Check if role id exists
  if (role_id) {
    // update employee role
    const employeeRole = await EmployeeRoleService.updateEmployeeRoleByEmployeeId(employee_id, { employee_id, role_id });
    employeeData.role = employeeRole.role_id;
  }

  // Update employee data
  const employee = await EmployeeService.updateEmployeeById(employee_id, { first_name, last_name, country });
  employeeData.data = employee;

  res.send(employeeData);
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
  assignProjectToEmployee,
  removeProjectFromEmployee,
};
