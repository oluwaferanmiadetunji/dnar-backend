const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('../../plugins');

const employeeSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },

    last_name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please, enter a valid email address');
        }
      },
    },

    country: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

employeeSchema.plugin(toJSON);
employeeSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The employee's email
 * @param {Number} [excludeEmployeeId] - The id of the employee to be excluded
 * @returns {Promise<boolean>}
 */
employeeSchema.statics.isEmailTaken = async function (email, excludeEmployeeId) {
  const employee = await this.findOne({ email, _id: { $ne: excludeEmployeeId } });
  return !!employee;
};

/**
 * @typedef Employee
 */
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
