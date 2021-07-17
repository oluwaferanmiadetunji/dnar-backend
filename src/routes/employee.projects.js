const express = require('express');
const validate = require('../middlewares/validate');
const Validation = require('../validation/employee.projects');
const Controller = require('../controllers/employee.projects');

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createEmployeeProject), Controller.createEmployeeProject)
  .get(validate(Validation.queryEmployeeProjects), Controller.queryEmployeeProjects);

router
  .route('/:id')
  .get(validate(Validation.getEmployeeProject), Controller.getEmployeeProject)
  .patch(validate(Validation.updateEmployeeProject), Controller.updateEmployeeProject)
  .delete(validate(Validation.deleteEmployeeProject), Controller.deleteEmployeeProject);

module.exports = router;
