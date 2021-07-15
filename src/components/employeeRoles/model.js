const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const employeeRolesSchema = mongoose.Schema(
  {
    _id: Number,

    employee_id: Number,

    role_id: Number,
  },
  {
    timestamps: true,
  },
  { _id: false },
);


employeeRolesSchema.plugin(toJSON);
employeeRolesSchema.plugin(paginate);

/**
 * @typedef EmployeeRole
 */
const EmployeeRole = mongoose.model('EmployeeRole', employeeRolesSchema);

module.exports = EmployeeRole;
