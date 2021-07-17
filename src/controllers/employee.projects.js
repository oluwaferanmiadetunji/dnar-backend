const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const EmployeeProjectService = require('../services/employee.projects');
const ProjectService = require('../services/projects');
const EmployeeService = require('../services/employees');

const createEmployeeProject = catchAsync(async (req, res) => {
  const { project_id, employee_id } = req.body;

  const employee = await EmployeeService.getEmployeeById(employee_id);
  // Check if Employee Exists
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  const project = await ProjectService.getProjectById(project_id);
  // Check if Project Exists
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const employeeProject = await EmployeeProjectService.createEmployeeProject({ project_id, employee_id });
  res.status(httpStatus.CREATED).send(employeeProject);
});

const queryEmployeeProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['project_id', 'employee_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await EmployeeProjectService.queryEmployeeProjects(filter, options);
  res.send(result);
});

const getEmployeeProject = catchAsync(async (req, res) => {
  const employeeProject = await EmployeeProjectService.getEmployeeProjectById(req.params.id);
  if (!employeeProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Project not found');
  }
  res.send(employeeProject);
});

const updateEmployeeProject = catchAsync(async (req, res) => {
  // Check if Employeed ID is in request body
  if (req.body.employee_id) {
    const employee = await EmployeeService.getEmployeeById(req.body.employee_id);
    // Check if Employee Exists
    if (!employee) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
    }
  }

  // Check if Project ID is in request body
  if (req.body.project_id) {
    const project = await ProjectService.getProjectById(req.body.project_id);
    // Check if Project Exists
    if (!project) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
  }
  const employeeProject = await EmployeeProjectService.updateEmployeeProjectById(req.params.id, req.body);

  res.send(employeeProject);
});

const deleteEmployeeProject = catchAsync(async (req, res) => {
  await EmployeeProjectService.deleteEmployeeProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEmployeeProject,
  queryEmployeeProjects,
  getEmployeeProject,
  updateEmployeeProject,
  deleteEmployeeProject,
};
