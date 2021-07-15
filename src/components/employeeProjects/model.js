const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const EmployeeProjectsSchema = mongoose.Schema(
  {
    project_id: Number,

    employee_id: Number,
  },
  {
    timestamps: true,
  },
);

EmployeeProjectsSchema.plugin(toJSON);
EmployeeProjectsSchema.plugin(paginate);

/**
 * @typedef EmployeeProjects
 */
const EmployeeProjects = mongoose.model('EmployeeProjects', EmployeeProjectsSchema);

module.exports = EmployeeProjects;
