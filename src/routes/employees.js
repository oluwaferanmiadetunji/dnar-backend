const express = require('express');
const validate = require('../middlewares/validate');
const Validation = require('../validation/employees');
const Controller = require('../controllers/employees');

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createEmployee), Controller.createEmployee)
  .get(validate(Validation.queryEmployee), Controller.getAllEmployees);

router
  .route('/:id')
  .get(validate(Validation.getEmployee), Controller.getEmployee)
  .patch(validate(Validation.updateEmployee), Controller.updateEmployee)
  .delete(validate(Validation.deleteEmployee), Controller.deleteEmployee);

router.route('/login').post(validate(Validation.login), Controller.login);

router.route('/:id/project/assign').post(validate(Validation.assignProjectToEmployee), Controller.assignProjectToEmployee);

router.route('/:id/project/remove').post(validate(Validation.assignProjectToEmployee), Controller.removeProjectFromEmployee);

module.exports = router;
