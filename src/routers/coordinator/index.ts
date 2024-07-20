import { Router } from "express";
import CoordinatorController from "../../controllers/coordinator/coorController";
import apiKeyAuth from "../../middlewares/apiKey";
// import AdminMiddleware from "../../middlewares/admin";
import { authToken } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const coordinatorRoute = Router();
const coordinatorController = new CoordinatorController();

/**
 * @swagger
 * tags:
 *   name: Coordinator
 *   description: API for coordinator management
 */
/**
 * @swagger
 * /api/v2/coordinator/create:
 *   post:
 *     summary: Create a new coordinator
 *     tags: [Coordinator]
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the coordinator
 *                 example: "John"
 *               middle_name:
 *                 type: string
 *                 description: The middle name of the coordinator
 *                 example: "A."
 *               last_name:
 *                 type: string
 *                 description: The last name of the coordinator
 *                 example: "Doe"
 *               birthdate:
 *                 type: string
 *                 description: The birthdate of the coordinator
 *                 example: "1990-01-01"
 *               email:
 *                 type: string
 *                 description: The email of the coordinator
 *                 example: "john.doe@example.com"
 *               contact_number:
 *                 type: string
 *                 description: The contact number of the coordinator
 *                 example: "1234567890"
 *               campus_id:
 *                 type: integer
 *                 description: The ID of the associated campus
 *                 example: 1
 *             required:
 *               - first_name
 *               - last_name
 *               - birthdate
 *               - email
 *               - contact_number
 *               - campus_id
 *     responses:
 *       201:
 *         description: Coordinator created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/v2/coordinator/update/{id}:
 *   put:
 *     summary: Update an existing coordinator
 *     tags: [Coordinator]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The coordinator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the coordinator
 *                 example: "John"
 *               middle_name:
 *                 type: string
 *                 description: The middle name of the coordinator
 *                 example: "A."
 *               last_name:
 *                 type: string
 *                 description: The last name of the coordinator
 *                 example: "Doe"
 *               birthdate:
 *                 type: string
 *                 description: The birthdate of the coordinator
 *                 example: "1990-01-01"
 *               email:
 *                 type: string
 *                 description: The email of the coordinator
 *                 example: "john.doe@example.com"
 *               contact_number:
 *                 type: string
 *                 description: The contact number of the coordinator
 *                 example: "1234567890"
 *               campus_id:
 *                 type: integer
 *                 description: The ID of the associated campus
 *                 example: 1
 *     responses:
 *       200:
 *         description: Coordinator updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/v2/coordinator/show/{id}:
 *   get:
 *     summary: Get a coordinator by ID
 *     tags: [Coordinator]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The coordinator ID
 *     responses:
 *       200:
 *         description: Coordinator retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       404:
 *         description: Coordinator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/v2/coordinator/list:
 *   get:
 *     summary: Get all coordinators
 *     tags: [Coordinator]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Coordinators retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       404:
 *         description: No coordinators available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/v2/coordinator/delete/{id}:
 *   delete:
 *     summary: Soft delete a coordinator by ID
 *     tags: [Coordinator]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The coordinator ID
 *     responses:
 *       200:
 *         description: Coordinator deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       404:
 *         description: Coordinator not found or already deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

coordinatorRoute.post(
    "/create",
    apiKeyAuth,
    authToken([UserRole.admin]),
    coordinatorController.create
);

coordinatorRoute.put(
    "/update/:id",
    apiKeyAuth,
    authToken([UserRole.admin]),
    coordinatorController.update
);

coordinatorRoute.get(
    "/show/:id",
    apiKeyAuth,
    authToken([UserRole.admin]),
    coordinatorController.show
);

coordinatorRoute.get(
    "/list",
    apiKeyAuth,
    authToken([UserRole.admin]),
    coordinatorController.list
);

coordinatorRoute.delete(
    "/delete/:id",
    apiKeyAuth,
    authToken([UserRole.admin]),
    coordinatorController.delete
);

export default coordinatorRoute;
