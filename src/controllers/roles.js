const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const RoleService = require('../services/roles');

const createRole = catchAsync(async (req, res) => {
  const role = await RoleService.addRoleToDataBase(req.body);
  res.status(httpStatus.CREATED).send(role);
});

const queryRoles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'description']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await RoleService.queryRoles(filter, options);
  res.send(result);
});

const getRole = catchAsync(async (req, res) => {
  const role = await RoleService.getRoleById(req.params.id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  res.send(role);
});

const updateRole = catchAsync(async (req, res) => {
  const role = await RoleService.updateRoleById(req.params.id, req.body);
  res.send(role);
});

const deleteRole = catchAsync(async (req, res) => {
  await RoleService.deleteRoleById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRole,
  queryRoles,
  getRole,
  updateRole,
  deleteRole,
};
