const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const employeeRolesSchema = mongoose.Schema(
  {
    employee_id: String,

    role_id: String,
  },
  {
    timestamps: true,
  },
);

employeeRolesSchema.plugin(toJSON);
employeeRolesSchema.plugin(paginate);

/**
 * @typedef EmployeeRole
 */
const EmployeeRole = mongoose.model('EmployeeRole', employeeRolesSchema);

module.exports = EmployeeRole;
