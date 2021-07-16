const express = require('express');
const config = require('./config/config');
const { Route: EmployeeProjectRoute } = require('./components/employeeProjects');
const { Route: EmployeeRoleRoute } = require('./components/employeeRoles');
const { Route: EmployeeRoute } = require('./components/employees');
const { Route: ProjectRoute } = require('./components/projects');
const { Route: RoleRoute } = require('./components/roles');
const docsRoute = require('./docs/route');

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

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* development routes */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
