const express = require('express');
const config = require('./config/config');
const { Route: EmployeeProjectRoute } = require('./components/employeeProjects');
const { Route: EmployeeRoleRoute } = require('./components/employeeRoles');
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