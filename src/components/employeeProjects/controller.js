const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const Service = require('./service');
const { Service: ProjectService } = require('../projects');
const { Service: EmployeeService } = require('../employees');

const createEmployeeProject = catchAsync(async (req, res) => {
  const { project_id, employee_id } = req.body;

  const employee = await EmployeeService.getEmployeeById(employee_id);
  if (!employee) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee not found');
  }

  const project = await ProjectService.getProjectById(project_id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const employeeProject = await Service.createEmployeeProject({ project_id, employee_id });
  res.status(httpStatus.CREATED).send(employeeProject);
});

const queryEmployeeProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['project_id', 'employee_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await Service.queryEmployeeProjects(filter, options);
  res.send(result);
});

const getEmployeeProject = catchAsync(async (req, res) => {
  const employeeProject = await Service.getEmployeeProjectById(req.params.id);
  if (!employeeProject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Project not found');
  }
  res.send(employeeProject);
});

const updateEmployeeProject = catchAsync(async (req, res) => {
  const employeeProject = await Service.updateEmployeeProjectById(req.params.id, req.body);
  res.send(employeeProject);
});

const deleteEmployeeProject = catchAsync(async (req, res) => {
  await Service.deleteEmployeeProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createEmployeeProject,
  queryEmployeeProjects,
  getEmployeeProject,
  updateEmployeeProject,
  deleteEmployeeProject,
};
