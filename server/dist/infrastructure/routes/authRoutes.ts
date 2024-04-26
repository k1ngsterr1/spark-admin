
import userController from "presentation/controllers/userController";

const express = require("express");
const router = express.Router();
import auth from "@infrastructure/middleware/authMiddleware";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a username, email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - passwordConfirmation
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email: 
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: newP@ssw0rd
 *               passwordConfirmation:
 *                 type: string
 *                 example: newP@ssw0rd
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Registration failed.
 */
router.post("/register", (req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Login a user with an email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email: 
 *                 type: string
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: newP@ssw0rd
 *     responses:
 *       200:
 *         description: User login successfully.
 *       400:
 *         description: Login failed.
 */
router.post("/login", (req, res, next) => userController.login(req, res, next));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 *     description: Change a user password with an old password and a new password.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword: 
 *                 type: string
 *                 example: newP@ssw0rd1
 *               newPassword:
 *                 type: string
 *                 example: newP@ssw0rd2
 *     responses:
 *       200:
 *         description: User login successfully.
 *       400:
 *         description: Login failed.
 */
router.post("/change-password", auth, (req, res, next) => userController.changeUserPassword(req, res, next));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 *     description: Change a user password with an old password and a new password.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword: 
 *                 type: string
 *                 example: newP@ssw0rd1
 *               newPassword:
 *                 type: string
 *                 example: newP@ssw0rd2
 *     responses:
 *       200:
 *         description: User login successfully.
 *       400:
 *         description: Login failed.
 */
router.post("/verify", (req, res) => userController.verifyUser(req, res));

export default router;