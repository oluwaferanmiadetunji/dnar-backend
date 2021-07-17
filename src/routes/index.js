const express = require('express');
const EmployeeProjectRoute = require('./employee.projects');
const EmployeeRoleRoute = require('./employee.roles');
const EmployeeRoute = require('./employees');
const ProjectRoute = require('./projects');
const RoleRoute = require('./roles');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/employee-projects',
    route: EmployeeProjectRoute,
  },
  {
    path: '/employee-roles',
    route: EmployeeRoleRoute,
  },
  {
    path: '/employee',
    route: EmployeeRoute,
  },
  {
    path: '/project',
    route: ProjectRoute,
  },
  {
    path: '/role',
    route: RoleRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
