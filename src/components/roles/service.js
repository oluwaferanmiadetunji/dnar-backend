const httpStatus = require('http-status');
const Model = require('./model');
const ApiError = require('../../utils/ApiError');

/**
 * Add a role to the database
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const addRoleToDataBase = async (body) => {
  const role = await Model.create(body);
  return role;
};

/**
 * Get all roles
 * @returns {Promise<QueryResult>}
 */
const queryRoles = async () => {
  const roles = await Model.find({});
  return roles;
};

/**
 * Get a role by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const getRoleById = async (id) => {
  return Model.findById(id);
};

/**
 * Update role by id
 * @param {Number} id
 * @param {Object} body
 * @returns {Promise<Model>}
 */
const updateRoleById = async (id, body) => {
  const role = await getRoleById(id);

  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  Object.assign(role, body);

  await role.save();
  return role;
};

/**
 * Delete role by id
 * @param {Number} id
 * @returns {Promise<Model>}
 */
const deleteRoleById = async (id) => {
  const role = await getRoleById(id);

  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }

  await role.remove();
  return role;
};

module.exports = {
  addRoleToDataBase,
  queryRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
