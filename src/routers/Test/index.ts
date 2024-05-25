import express from "express";
import TestController from "../../controllers/default/testController";
import apiKeyAuth from "../../middlewares/apiKey";

const testRouter = express.Router();
const testController = new TestController();

/**
 * @swagger
 * tags:
 *  name:Default
 *  description:Default Operation
 */
/**
 * @swagger
 * /api/v2:
 *   get:
 *     summary: Retrieve a message
 *     tags: [Default]
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: A simple message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
testRouter.get("/", apiKeyAuth, testController.index);

export default testRouter;
