import { Router } from "express";
import session from "express-session";
import config from "../../config/index";
import AdminController from "../../controllers/admin/adminController";
import {
  checkSessionOtp,
  sessionCheck,
  sessionResetValidation,
} from "../../middlewares/session";
import apiKeyAuth from "../../middlewares/apiKey";
import AdminMiddleware from "../../middlewares/admin";

const adminRoute = Router();
const adminController = new AdminController();

adminRoute.use(
  session({
    secret: config.session.secret, // Replace with your actual secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: config.session.age },
  })
);
/**
 * @swagger
 * tags:
 *   name: Admin Authentication
 *   description: This API will allow the user to log in to the system
 */
/**
 * @swagger
 * /api/v2/admin/authenticate:
 *   post:
 *     summary: Authentication API
 *     description: |
 *       This endpoint allows the admin to log in. It has two possible outcomes:
 *       1. If the device used by the admin is trusted, a token will be generated.
 *       2. If the device is not trusted, a verification code will be sent to the admin's email.
 *     tags: [Admin Authentication]
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email is required
 *                 example: sampleemail@gmail.com
 *               password:
 *                 type: string
 *                 description: Password is required
 *                 example: pass123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                     verification_id:
 *                       type: string
 *                       example: 0aeb1eec-5bb4-453c-8032-790b7e6d984a
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 401
 */

adminRoute.post(
  "/authenticate",
  apiKeyAuth,
  sessionCheck,
  adminController.auth
);

/**
 * @swagger
 * tags:
 *   name: Admin Auth Verification
 *   description: This API will allow the user to verify their log in
 */
/**
 * @swagger
 * /api/v2/admin/verification/{verification_id}:
 *   post:
 *     summary: Verification API
 *     tags: [Admin Authentication]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: verification_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification_id of the device used by the admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 description: OTP is required
 *                 example: "123456"
 *             required:
 *               - otp
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '400':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect verification code. Remaining attempts 2
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 400
 *       '404':
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token not found
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 404
 *       '429':
 *         description: Max attempts reached
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect verification code. Max attempts reached. Please try again later.
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 429
 */

adminRoute.post(
  "/verification/:verification_id",
  apiKeyAuth,
  checkSessionOtp,
  adminController.verifyAuth
);
adminRoute.put(
  "/reset/verification/:verification_id",
  apiKeyAuth,
  sessionResetValidation,
  adminController.resetVerification
);

adminRoute.get(
  "/test",
  apiKeyAuth,
  AdminMiddleware.authToken,
  adminController.get
);

adminRoute.post(
  "/update",
  apiKeyAuth,
  AdminMiddleware.authToken,
  adminController.update
);

adminRoute.post(
  "/change-password",
  apiKeyAuth,
  AdminMiddleware.authToken,
  adminController.changePassword
);

export default adminRoute;
