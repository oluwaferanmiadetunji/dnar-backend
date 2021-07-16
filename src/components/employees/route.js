const express = require('express');
const validate = require('../../middlewares/validate');
const Validation = require('./validation');
const Controller = require('./controller');

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createEmployee), Controller.createEmployee)
  .get(validate(Validation.queryEmployee), Controller.queryEmployee);

router
  .route('/:id')
  .get(validate(Validation.getEmployee), Controller.getEmployee)
  .patch(validate(Validation.updateEmployee), Controller.updateEmployee)
  .delete(validate(Validation.deleteEmployee), Controller.deleteEmployee);

router.route('/login').post(validate(Validation.login), Controller.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: Employee management and retrieval
 */

/**
 * @swagger
 * path:
 *  /employee:
 *    post:
 *      summary: Add employee to database
 *      tags: [Employee]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                email:
 *                  type: string
 *                country:
 *                  type: string
 *              example:
 *                first_name: fake first name
 *                last_name: fake last name
 *                email: fake email
 *                country: fake country
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all Employee
 *      tags: [Employee]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: first_name
 *          schema:
 *            type: string
 *          description: First Name
 *        - in: query
 *          name: last_name
 *          schema:
 *            type: string
 *          description: Last Name
 *        - in: query
 *          name: email
 *          schema:
 *            type: string
 *          description: Email
 *        - in: query
 *          name: country
 *          schema:
 *            type: string
 *          description: Countr
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of employee
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Employee'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /employee/{id}:
 *    get:
 *      summary: Get an employee
 *      tags: [Employee]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Employee id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update an employee
 *      tags: [Employee]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Employee id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                first_name:
 *                  type: string
 *                last_name:
 *                  type: string
 *                email:
 *                  type: string
 *                country:
 *                  type: string
 *              example:
 *                 first_name: fake first name
 *                last_name: fake last name
 *                email: fake email
 *                country: fake country
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete an employee
 *      tags: [Employee]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
