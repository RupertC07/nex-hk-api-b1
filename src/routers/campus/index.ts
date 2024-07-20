import { Router } from "express";
import CampusController from "../../controllers/campus/campusController";
// import AdminMiddleware from "../../middlewares/admin";
import { authToken } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import apiKeyAuth from "../../middlewares/apiKey";
const campusRoute = Router();
const campusController = new CampusController();

/**
 * @swagger
 * tags:
 *   name: Campus
 *   description: API for campus management
 */
/**
 * @swagger
 * /api/v2/campus/create:
 *   post:
 *     summary: Create a new campus
 *     tags: [Campus]
 *     security:
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
 *                 description: The name of the campus
 *                 example: "Main Campus"
 *               description:
 *                 type: string
 *                 description: The description of the campus
 *                 example: "This is the main campus"
 *               address:
 *                 type: string
 *                 description: The address of the campus
 *                 example: "123 Main St."
 *               code:
 *                 type: string
 *                 description: The code of the campus
 *                 example: "MC123"
 *             required:
 *               - name
 *               - address
 *     responses:
 *       201:
 *         description: Campus created successfully
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
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

campusRoute.post(
    "/create",
    apiKeyAuth,
    authToken([UserRole.admin]),
    campusController.create,
);

/**
 * @swagger
 * /api/v2/campus/update/{id}:
 *   put:
 *     summary: Update an existing campus
 *     tags: [Campus]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The campus ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the campus
 *                 example: "Main Campus"
 *               description:
 *                 type: string
 *                 description: The description of the campus
 *                 example: "This is the main campus"
 *               address:
 *                 type: string
 *                 description: The address of the campus
 *                 example: "123 Main St."
 *               code:
 *                 type: string
 *                 description: The code of the campus
 *                 example: "MC123"
 *     responses:
 *       200:
 *         description: Campus updated successfully
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

campusRoute.put(
    "/update/:id",
    apiKeyAuth,
    authToken([UserRole.admin]),
    campusController.update
);

/**
 * @swagger
 * /api/v2/campus/show/{id}:
 *   get:
 *     summary: Get a campus by ID
 *     tags: [Campus]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The campus ID
 *     responses:
 *       200:
 *         description: Campus retrieved successfully
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
 *         description: Campus not found
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

campusRoute.get(
    "/show/:id",
    apiKeyAuth,
    authToken([UserRole.admin]),
    campusController.show
);

/**
 * @swagger
 * /api/v2/campus/list:
 *   get:
 *     summary: Get all campuses
 *     tags: [Campus]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: Campuses retrieved successfully
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

campusRoute.get(
    "/list",
    apiKeyAuth,
    authToken([UserRole.admin]),
    campusController.list
);

/**
 * @swagger
 * /api/v2/campus/delete/{id}:
 *   delete:
 *     summary: Delete a campus by ID
 *     tags: [Campus]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The campus ID
 *     responses:
 *       200:
 *         description: Campus deleted successfully
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
 *         description: Campus not found or has been deleted
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


campusRoute.delete(
    "/delete/:id",
    apiKeyAuth,
    authToken([UserRole.admin]),
    campusController.delete
);

export default campusRoute;