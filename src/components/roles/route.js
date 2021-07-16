const express = require('express');
const validate = require('../../middlewares/validate');
const Validation = require('./validation');
const Controller = require('./controller');

const router = express.Router();

router
  .route('/')
  .post(validate(Validation.createEmployeeProject), Controller.createEmployeeProject)
  .get(validate(Validation.queryEmployeeProjects), Controller.queryEmployeeProjects);

router
  .route('/:id')
  .get(validate(Validation.getEmployeeProject), Controller.getEmployeeProject)
  .patch(validate(Validation.updateEmployeeProject), Controller.updateEmployeeProject)
  .delete(validate(Validation.deleteEmployeeProject), Controller.deleteEmployeeProject);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Employee Projects
 *   description: Employee Projects management and retrieval
 */

/**
 * @swagger
 * path:
 *  /employee-projects:
 *    post:
 *      summary: Add employee project to database
 *      description: Only admins can create other users.
 *      tags: [EmployeeProjects]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - project_id
 *                - employee_id
 *              properties:
 *                project_id:
 *                  type: int
 *                employee_id:
 *                  type: int
 *              example:
 *                project_id: 1
 *                employee_id: 1
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/EmployeeProjects'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all Employee Projects
 *      tags: [EmployeeProjects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: project_id
 *          schema:
 *            type: int
 *          description: Project ID
 *        - in: query
 *          name: employee_id
 *          schema:
 *            type: int
 *          description: Employee ID
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
 *          description: Maximum number of employee projects
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
 *                      $ref: '#/components/schemas/EmployeeProjects'
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
 *  /employee-projects/{id}:
 *    get:
 *      summary: Get an employee project
 *      tags: [EmployeeProjects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Employee project id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/EmployeeProject'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update an employee project
 *      tags: [EmployeeProjects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: User id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               project_id:
 *                  type: int
 *                employee_id:
 *                  type: int
 *              example:
 *                 project_id: 1
 *                employee_id: 1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/EmployeeProjects'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete an employee project
 *      tags: [EmployeeProjects]
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
