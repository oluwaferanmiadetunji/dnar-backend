const express = require('express');
const { Route: EmployeeProjectRoute } = require('./components/employeeProjects');
const { Route: EmployeeRoleRoute } = require('./components/employeeRoles');
const { Route: EmployeeRoute } = require('./components/employees');
const { Route: ProjectRoute } = require('./components/projects');
const { Route: RoleRoute } = require('./components/roles');

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
