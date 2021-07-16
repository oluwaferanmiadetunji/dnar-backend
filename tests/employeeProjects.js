const assert = require('assert');
const { Service, Model } = require('../src/components/employeeProjects');

describe('Test Suite for Employee Projects', () => {
  it('creates an employee project', (done) => {
    Service.createEmployeeProject({ project_id: '60f0e56949822d1a36762d2b', employee_id: '60f0e56949822d1a36762d2b' }).then((result) => {
      assert(!result.isNew);
      done();
    });
  });
});
