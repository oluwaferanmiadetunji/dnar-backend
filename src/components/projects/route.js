const express = require('express');
const validate = require('../../middlewares/validate');
const Validation = require('./validation');
const Controller = require('./controller');

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createProject), Controller.createProject)
  .get(validate(Validation.queryProjects), Controller.queryProjects);

router
  .route('/:id')
  .get(validate(Validation.getProject), Controller.getProject)
  .patch(validate(Validation.updateProject), Controller.updateProject)
  .delete(validate(Validation.deleteProject), Controller.deleteProject);

module.exports = router;
