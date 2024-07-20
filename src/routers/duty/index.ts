import { Router } from "express";
import DutyController from "../../controllers/duty/dutyController";
import apiKeyAuth from "../../middlewares/apiKey";
import AdminMiddleware from "../../middlewares/admin";

const dutyRoute = Router();
const dutyController = new DutyController();
/**
 * @swagger
 * tags:
 *   name: Duty Management
 *   description: This API handles operations related to duty management.
 */
/**
 * @swagger
 * /api/v2/duty:
 *   post:
 *     summary: Create Duty API
 *     description: This endpoint allows an admin to create a new duty.
 *     tags: [Duty Management]
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
 *               name:
 *                 type: string
 *                 description: Name of the duty
 *                 example: "Administrative"
 *               acronym:
 *                 type: string
 *                 description: Acronym for the duty (optional)
 *                 example: "ADM"
 *                 nullable: true
 *               description:
 *                 type: string
 *                 description: Description of the duty
 *                 example: "Handles administrative tasks"
 *               required_hours:
 *                 type: integer
 *                 description: Number of hours required for the duty
 *                 example: 40
 *             required:
 *               - name
 *               - description
 *               - required_hours
 *     responses:
 *       '201':
 *         description: Duty has been successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Administrative"
 *                     acronym:
 *                       type: string
 *                       example: "ADM"
 *                       nullable: true
 *                     description:
 *                       type: string
 *                       example: "Handles administrative tasks"
 *                     required_hours:
 *                       type: integer
 *                       example: 40
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                 message:
 *                   type: string
 *                   example: "Duty has been successfully created"
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 201
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error: [Validation error message]"
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

dutyRoute.post(
  "/",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.create
);

/**
 * @swagger
 * tags:
 *   name: Duty Management
 *   description: This API handles operations related to duty management.
 */
/**
 * @swagger
 * /api/v2/duty/{id}:
 *   put:
 *     summary: Update Duty API
 *     description: This endpoint allows an admin to update the details of an existing duty.
 *     tags: [Duty Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the duty to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the duty
 *                 example: "Administrative"
 *               acronym:
 *                 type: string
 *                 description: Acronym for the duty (optional)
 *                 example: "ADM"
 *                 nullable: true
 *               description:
 *                 type: string
 *                 description: Description of the duty
 *                 example: "Handles administrative tasks"
 *               required_hours:
 *                 type: integer
 *                 description: Number of hours required for the duty
 *                 example: 40
 *             required:
 *               - name
 *               - description
 *               - required_hours
 *     responses:
 *       '200':
 *         description: Duty has been successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Administrative"
 *                     acronym:
 *                       type: string
 *                       example: "ADM"
 *                       nullable: true
 *                     description:
 *                       type: string
 *                       example: "Handles administrative tasks"
 *                     required_hours:
 *                       type: integer
 *                       example: 40
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                 message:
 *                   type: string
 *                   example: "Duty has been successfully updated"
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error: [Validation error message]"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 400
 *       '404':
 *         description: Duty not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Duty not found"
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

dutyRoute.put(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.update
);
/**
 * @swagger
 * tags:
 *   name: Duty Management
 *   description: This API handles operations related to duty management.
 */
/**
 * @swagger
 * /api/v2/duties/{id}:
 *   delete:
 *     summary: Delete Duty API
 *     description: This endpoint allows an admin to delete a duty.
 *     tags: [Duty Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the duty to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Duty has been successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Duty has been successfully deleted"
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '404':
 *         description: Duty not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Duty not found"
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

dutyRoute.delete(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.delete
);

/**
 * @swagger
 * tags:
 *   name: Duty Management
 *   description: This API handles operations related to duty management.
 */
/**
 * @swagger
 * /api/v2/duty:
 *   get:
 *     summary: List Duties API
 *     description: This endpoint retrieves a list of duties with optional search, pagination, and sorting.
 *     tags: [Duty Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search term for filtering duties by name or description
 *         schema:
 *           type: string
 *           example: "urgent"
 *       - name: perPage
 *         in: query
 *         description: Number of duties to retrieve per page
 *         schema:
 *           type: integer
 *           example: 5
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Duties have been successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 duties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Duty Name"
 *                       acronym:
 *                         type: string
 *                         example: "DN"
 *                       description:
 *                         type: string
 *                         example: "Description of the duty"
 *                       required_hours:
 *                         type: integer
 *                         example: 8
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T00:00:00.000Z"
 *                       deleted_at:
 *                         type: string
 *                         format: date-time
 *                         example: null
 *                 totalDuties:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 nextPage:
 *                   type: integer
 *                   example: 2
 *                 prevPage:
 *                   type: integer
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
dutyRoute.get("/", apiKeyAuth, AdminMiddleware.authToken, dutyController.list);

/**
 * @swagger
 * tags:
 *   name: Duty Management
 *   description: This API handles operations related to duty management.
 */
/**
 * @swagger
 * /api/v2/duty/{id}:
 *   get:
 *     summary: Get Duty by ID API
 *     description: This endpoint retrieves a specific duty by its ID.
 *     tags: [Duty Management]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the duty to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Duty has been successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Duty Name"
 *                 acronym:
 *                   type: string
 *                   example: "DN"
 *                 description:
 *                   type: string
 *                   example: "Description of the duty"
 *                 required_hours:
 *                   type: integer
 *                   example: 8
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
 *         description: Duty not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Duty not found"
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

dutyRoute.get(
  "/:id",
  apiKeyAuth,
  AdminMiddleware.authToken,
  dutyController.get
);

export default dutyRoute;
