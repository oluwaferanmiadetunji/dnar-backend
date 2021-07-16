const express = require('express');
const validate = require('../../middlewares/validate');
const Validation = require('./validation');
const Controller = require('./controller');

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createEmployeeRole), Controller.createEmployeeRole)
  .get(validate(Validation.queryEmployeeRoles), Controller.queryEmployeeRoles);

router
  .route('/:id')
  .get(validate(Validation.getEmployeeRole), Controller.getEmployeeRole)
  .patch(validate(Validation.updateEmployeeRole), Controller.updateEmployeeRole)
  .delete(validate(Validation.deleteEmployeeRole), Controller.deleteEmployeeRole);

module.exports = router;
