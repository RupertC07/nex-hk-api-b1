import { Router } from "express";
import SemesterController from "../../controllers/semester/semesterController";
import apiKeyAuth from "../../middlewares/apiKey";
// import AdminMiddleware from "../../middlewares/admin";
import { authToken } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const semRouter = Router();
const semController = new SemesterController();

/**
 * @swagger
 * tags:
 *   name: Semester Management
 *   description: This API handles operations related to semester management.
 */
/**
 * @swagger
 * /api/v2/semester:
 *   post:
 *     summary: Create Semester API
 *     description: This endpoint creates a new semester.
 *     tags: [Semester Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sy:
 *                 type: string
 *                 description: School Year (e.g., 2024-2025)
 *                 example: "2024-2025"
 *               term:
 *                 type: string
 *                 description: Term within the school year (e.g., Fall, Spring)
 *                 example: "Fall"
 *               status:
 *                 type: string
 *                 description: Status of the semester (e.g., active, inactive)
 *                 example: "active"
 *             required:
 *               - sy
 *               - term
 *     responses:
 *       '200':
 *         description: Semester has been successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 sy:
 *                   type: string
 *                   example: "2024-2025"
 *                 term:
 *                   type: string
 *                   example: "1st"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T00:00:00.000Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T00:00:00.000Z"
 *                 deleted_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 400
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.post(
  "/",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.create
);

/**
 * @swagger
 * tags:
 *   name: Semester Management
 *   description: This API handles operations related to semester management.
 */
/**
 * @swagger
 * /api/v2/semester/activate/{id}:
 *   put:
 *     summary: Activate Semester API
 *     description: This endpoint activates a specific semester and deactivates the currently active semester if any.
 *     tags: [Semester Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the semester to be activated.
 *     responses:
 *       '200':
 *         description: Semester has been successfully activated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 sy:
 *                   type: string
 *                   example: "2024-2025"
 *                 term:
 *                   type: string
 *                   example: "Fall"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T00:00:00.000Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T00:00:00.000Z"
 *                 deleted_at:
 *                   type: string
 *                   format: date-time
 *                   example: null
 *       '404':
 *         description: Semester not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester not found"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 404
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.put(
  "/activate/:id",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.activate
);

/**
 * @swagger
 * tags:
 *   name: Semester Management
 *   description: This API handles operations related to semester management.
 */
/**
 * @swagger
 * /api/v2/semester/deactivate:
 *   put:
 *     summary: Deactivate Semester API
 *     description: This endpoint deactivates the currently active semester.
 *     tags: [Semester Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Semester has been successfully deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester has been successfully deactivated"
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.put(
  "/deactivate",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.deactivate
);
/**
 * @swagger
 * tags:
 *   - name: Semester Management
 *     description: This API handles operations related to semester management.
 */
/**
 * @swagger
 * /api/v2/semester/{id}:
 *   put:
 *     summary: Update Semester API
 *     description: >
 *       This endpoint updates the details of a specific semester.
 *       Note: Use query parameter `?_method=POST` if the HTTP method is overridden.
 *     tags:
 *       - Semester Management
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the semester to be updated.
 *       - in: query
 *         name: _method
 *         schema:
 *           type: string
 *           default: PUT
 *         description: Method override parameter. Use `?_method=POST` if HTTP method is overridden.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sy:
 *                 type: string
 *                 description: Academic year
 *                 example: 2024
 *               term:
 *                 type: string
 *                 description: Term of the academic year
 *                 example: Fall
 *             required:
 *               - sy
 *               - term
 *     responses:
 *       '200':
 *         description: Semester has been successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester has been successfully updated"
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '400':
 *         description: Validation error or Semester already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message or Semester already exists"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 400
 *       '404':
 *         description: Semester not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester not found"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 404
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.put(
  "/:id",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.update
);

/**
 * @swagger
 * tags:
 *   name: Semester Management
 *   description: This API handles operations related to semester management.
 */
/**
 * @swagger
 * /api/v2/semesters:
 *   get:
 *     summary: List Semesters API
 *     description: This endpoint retrieves a list of semesters with optional search and pagination parameters.
 *     tags: [Semester Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter the list of semesters by academic year or term.
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of semesters to return per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number to retrieve.
 *     responses:
 *       '200':
 *         description: List of semesters successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 semester:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID of the semester
 *                         example: 1
 *                       sy:
 *                         type: string
 *                         description: Academic year
 *                         example: 2024
 *                       term:
 *                         type: string
 *                         description: Term of the academic year
 *                         example: Fall
 *                       status:
 *                         type: string
 *                         description: Status of the semester
 *                         example: active
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the semester was created
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the semester was last updated
 *                 totalSemester:
 *                   type: integer
 *                   description: Total number of semesters returned in the current response
 *                   example: 5
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available based on pagination
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                   example: 1
 *                 nextPage:
 *                   type: integer
 *                   description: Page number of the next page, null if there is no next page
 *                   example: 2
 *                 prevPage:
 *                   type: integer
 *                   description: Page number of the previous page, null if there is no previous page
 *                   example: null
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.get("/", apiKeyAuth, authToken([UserRole.admin]), semController.list);

/**
 * @swagger
 * tags:
 *   name: Semester Management
 *   description: This API handles operations related to semester management.
 */
/**
 * @swagger
 * /api/v2/semesters/active:
 *   get:
 *     summary: Get Active Semester
 *     description: This endpoint retrieves the currently active semester.
 *     tags: [Semester Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Active semester successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the active semester
 *                   example: 1
 *                 sy:
 *                   type: string
 *                   description: Academic year of the active semester
 *                   example: 2024
 *                 term:
 *                   type: string
 *                   description: Term of the active semester
 *                   example: Fall
 *                 status:
 *                   type: string
 *                   description: Status of the semester
 *                   example: active
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the semester was created
 *                   example: "2024-01-01T00:00:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the semester was last updated
 *                   example: "2024-01-01T00:00:00Z"
 *       '404':
 *         description: No active semester found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Active semester not found"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.get(
  "/active",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.showActive
);

/**
 * @swagger
 * /api/v2/semesters/{id}:
 *   get:
 *     summary: Get Semester by ID
 *     description: This endpoint retrieves a specific semester based on the provided ID.
 *     tags: [Semester Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the semester to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Semester successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the semester
 *                   example: 1
 *                 sy:
 *                   type: string
 *                   description: Academic year of the semester
 *                   example: 2024
 *                 term:
 *                   type: string
 *                   description: Term of the semester
 *                   example: Fall
 *                 status:
 *                   type: string
 *                   description: Status of the semester
 *                   example: active
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the semester was created
 *                   example: "2024-01-01T00:00:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date when the semester was last updated
 *                   example: "2024-01-01T00:00:00Z"
 *       '404':
 *         description: Semester not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester not found"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.get(
  "/:id",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.show
);
/**
 * @swagger
 * /api/v2/semesters/{id}:
 *   delete:
 *     summary: Delete Semester by ID
 *     description: This endpoint deletes a specific semester based on the provided ID.
 *     tags: [Semester Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the semester to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Semester successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester has been successfully removed"
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '404':
 *         description: Semester not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Semester not found"
 *                 code:
 *                   type: integer
 *                   example: 404
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 code:
 *                   type: integer
 *                   example: 500
 */

semRouter.delete(
  "/:id",
  apiKeyAuth,
  authToken([UserRole.admin]),
  semController.delete
);

export default semRouter;
