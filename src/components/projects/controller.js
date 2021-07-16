const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const Service = require('./service');

const createProject = catchAsync(async (req, res) => {
  const project = await Service.addProjectToDataBase(req.body);
  res.status(httpStatus.CREATED).send(project);
});

const queryProjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'description']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await Service.queryProjects(filter, options);
  res.send(result);
});

const getProject = catchAsync(async (req, res) => {
  const project = await Service.getProjectById(req.params.id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Employee Project not found');
  }
  res.send(project);
});

const updateProject = catchAsync(async (req, res) => {
  const project = await Service.updateProjectById(req.params.id, req.body);
  res.send(project);
});

const deleteProject = catchAsync(async (req, res) => {
  await Service.deleteProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProject,
  queryProjects,
  getProject,
  updateProject,
  deleteProject,
};
