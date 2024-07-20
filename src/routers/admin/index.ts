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
// import AdminMiddleware from "../../middlewares/admin";
import { authToken } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

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
/**
 * @swagger
 * tags:
 *   name: Auth Code Reset
 *   description: This API will handle verification code reset
 */
/**
 * @swagger
 * /api/v2/admin/reset/verification/{verification_id}:
 *   put:
 *     summary: Reset Verification Code API
 *     description: This endpoint resets the verification code and sends a new one to the admin's email.
 *     tags: [Auth Code Reset]
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: verification_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification_id for which the code is to be reset
 *     responses:
 *       '201':
 *         description: New OTP successfully sent to email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New OTP has been successfully sent to email
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 201
 *       '404':
 *         description: Token not found
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
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

adminRoute.put(
  "/reset/verification/:verification_id",
  apiKeyAuth,
  sessionResetValidation,
  adminController.resetVerification
);

/**
 * @swagger
 * tags:
 *   name: Admin Profile
 *   description: This API handles retrieving the profile details of an admin
 */
/**
 * @swagger
 * /api/v2/admin/profile:
 *   get:
 *     summary: Get Admin Profile API
 *     description: This endpoint retrieves the profile details of the admin.
 *     tags: [Admin Profile]
 *     security:
 *       - bearerAuth: []
 *       - apiKeyAuth: []
 *     responses:
 *       '200':
 *         description: Profile details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     // Define the properties of adminData here
 *                 message:
 *                   type: string
 *                   example: Success
 *                 response:
 *                   type: string
 *                   example: Success
 *                 code:
 *                   type: integer
 *                   example: 200
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 401
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

adminRoute.get(
  "/profile",
  apiKeyAuth,
  authToken([UserRole.admin]),
  adminController.get
);

/**
 * @swagger
 * tags:
 *   name: Admin Profile
 *   description: This API handles updating the profile details of an admin
 */
/**
 * @swagger
 * /api/v2/admin/update:
 *   post:
 *     summary: Update Admin Profile API
 *     description: This endpoint updates the profile details of the admin.
 *     tags: [Admin Profile]
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
 *               first_name:
 *                 type: string
 *                 description: First name of the admin
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: Last name of the admin
 *                 example: Doe
 *               email:
 *                 type: string
 *                 description: Email address of the admin
 *                 example: john.doe@example.com
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Birthdate of the admin
 *                 example: 1980-01-01
 *                 nullable: true
 *               contact_number:
 *                 type: string
 *                 description: Contact number of the admin
 *                 example: 123-456-7890
 *                 nullable: true
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *     responses:
 *       '200':
 *         description: Admin has been successfully updated
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
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     birthdate:
 *                       type: string
 *                       format: date
 *                       example: 1980-01-01
 *                       nullable: true
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     contact_number:
 *                       type: string
 *                       example: 123-456-7890
 *                       nullable: true
 *                     role:
 *                       type: string
 *                       example: admin
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-01T00:00:00.000Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-01-01T00:00:00.000Z
 *                 message:
 *                   type: string
 *                   example: Admin has been successfully updated
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
 *                   example: "New password must be at least 8 characters long"
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 400
 *       '404':
 *         description: Admin account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin account not found
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
 *                   example: Internal Server Error
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

adminRoute.post(
  "/update",
  apiKeyAuth,
  authToken([UserRole.admin]),
  adminController.update
);
/**
 * @swagger
 * tags:
 *   name: Admin Profile
 *   description: This API handles admin-related operations including profile management and password changes.
 */
/**
 * @swagger
 * /api/v2/admin/change-password:
 *   post:
 *     summary: Change Admin Password API
 *     description: This endpoint allows an admin to change their password.
 *     tags: [Admin Profile]
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
 *               old_password:
 *                 type: string
 *                 description: Current password of the admin
 *                 example: oldPass123
 *               new_password:
 *                 type: string
 *                 description: New password for the admin
 *                 example: newPass123
 *               confirm_password:
 *                 type: string
 *                 description: Confirmation of the new password
 *                 example: newPass123
 *             required:
 *               - old_password
 *               - new_password
 *               - confirm_password
 *     responses:
 *       '200':
 *         description: Password has been successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password has been successfully changed
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
 *                   example: New password must be at least 8 characters long
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 400
 *       '403':
 *         description: User not found or current password is invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found or current password is invalid
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 403
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 response:
 *                   type: string
 *                   example: Error
 *                 code:
 *                   type: integer
 *                   example: 500
 */

adminRoute.post(
  "/change-password",
  apiKeyAuth,
  authToken([UserRole.admin]),
  adminController.changePassword
);

export default adminRoute;
