import userController from "presentation/controllers/userController";

const express = require("express");
const router = express.Router();
import auth from "@infrastructure/middleware/authMiddleware";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Регистрация нового пользователя с именем пользователя, электронной почтой и паролем.
 *     tags:
 *       - Аутентификация
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
 *         description: Пользователь успешно зарегистрирован.
 *       400:
 *         description: Регистрация не удалась.
 */
router.post("/register", (req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход пользователя
 *     description: Вход пользователя с использованием электронной почты и пароля.
 *     tags:
 *       - Аутентификация
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
 *         description: Пользователь успешно вошел в систему.
 *       400:
 *         description: Вход в систему не удался.
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
 *     summary: Изменение пароля пользователя
 *     description: Изменение пароля пользователя, используя старый и новый пароли.
 *     tags:
 *       - Аутентификация
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
 *         description: Пароль успешно изменен.
 *       400:
 *         description: Изменение пароля не удалось.
 */
router.post("/change-password", auth, (req, res) => userController.changeUserPassword(req, res));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/auth/verify:
 *   post:
 *     summary: Подтверждение пользователя
 *     description: Подтверждение пользователя с использованием ID и кода.
 *     tags:
 *       - Аутентификация
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - code
 *             properties:
 *               id: 
 *                 type: number
 *                 example: 1
 *               code:
 *                 type: string
 *                 example: AA7RQ
 *     responses:
 *       200:
 *         description: Пользователь успешно подтвержден.
 *       400:
 *         description: Подтверждение не удалось.
 */
router.post("/verify", (req, res) => userController.verifyUser(req, res));

export default router;
