const express = require('express');
const validate = require('../middlewares/validate');
const Validation = require('../validation/roles');
const Controller = require('../controllers/roles');

const router = express.Router();

router.route('/').post(validate(Validation.createRole), Controller.createRole).get(validate(Validation.queryRole), Controller.queryRoles);

router
  .route('/:id')
  .get(validate(Validation.getRole), Controller.getRole)
  .patch(validate(Validation.updateRole), Controller.updateRole)
  .delete(validate(Validation.deleteRole), Controller.deleteRole);

module.exports = router;
