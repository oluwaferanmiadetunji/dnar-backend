const mongoose = require('mongoose');

const dbHandler = require('./db-handler');

const { Service } = require('../src/components/employees');

/**
 * Complete Employee Data.
 */
const employeeData = {
  first_name: 'fake first name',
  last_name: 'fake last name',
  email: 'fake@email.com',
  country:'fake country'
};

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Employees test suite.
 */
describe('Employees ', () => {
  /**
   * Tests that an employee can be created through the employee service without throwing any errors.
   */
  it('can be created correctly', async () => {
    expect(async () => await Service.addEmployeeToDataBase(employeeData)).not.toThrow();
  });
});
