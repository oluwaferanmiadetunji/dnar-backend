const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

projectsSchema.plugin(toJSON);
projectsSchema.plugin(paginate);

/**
 * @typedef Projects
 */
const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;
