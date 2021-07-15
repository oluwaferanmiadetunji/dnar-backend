const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const employeeRolesSchema = mongoose.Schema(
  {
    employee_id: Number,

    role_id: Number,
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
