"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coorController_1 = __importDefault(require("../../controllers/coordinator/coorController"));
const apiKey_1 = __importDefault(require("../../middlewares/apiKey"));
// import AdminMiddleware from "../../middlewares/admin";
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const coordinatorRoute = (0, express_1.Router)();
const coordinatorController = new coorController_1.default();
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
coordinatorRoute.post("/create", apiKey_1.default, (0, auth_1.authToken)([client_1.UserRole.admin]), coordinatorController.create);
coordinatorRoute.put("/update/:id", apiKey_1.default, (0, auth_1.authToken)([client_1.UserRole.admin]), coordinatorController.update);
coordinatorRoute.get("/show/:id", apiKey_1.default, (0, auth_1.authToken)([client_1.UserRole.admin]), coordinatorController.show);
coordinatorRoute.get("/list", apiKey_1.default, (0, auth_1.authToken)([client_1.UserRole.admin]), coordinatorController.list);
coordinatorRoute.delete("/delete/:id", apiKey_1.default, (0, auth_1.authToken)([client_1.UserRole.admin]), coordinatorController.delete);
exports.default = coordinatorRoute;
//# sourceMappingURL=index.js.map