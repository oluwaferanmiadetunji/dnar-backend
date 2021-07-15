const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

const RolesSchema = mongoose.Schema(
  {
    _id: Number,

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

RolesSchema.plugin(toJSON);
RolesSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', RolesSchema);

module.exports = Role;
