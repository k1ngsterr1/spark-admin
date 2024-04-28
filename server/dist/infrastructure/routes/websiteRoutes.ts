import websiteController from "presentation/controllers/websiteController";
import pageRoutes from "./pageRoutes";

import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/add:
 *   post:
 *     summary: Добавление вебсайта
 *     description: Добавление вебсайта через ID пользователя, электронную почту, название вебсайта, URL вебсайта
 *     tags:
 *       - Вебсайт
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *             properties:
 *               name:
 *                 type: string
 *                 example: Spark Studio
 *               url:
 *                 type: string
 *                 example: https://sparkstudio.kz/
 *     responses:
 *       200:
 *         description: Вебсайт успешно добавлен
 *       400:
 *         description: Не удалось добавить страницу
 *       500:
 *         description: Произошла ошибка при добавлении вебсайsта
 */
router.post("/add", (req, res) => websiteController.addWebsite(req, res));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/add-user:
 *   post:
 *     summary: Добавление пользователя в вебсайт
 *     description: Добавление пользователя в вебсайт через электронную почту, ID вебсайта, ID пользователя и роли для пользователя
 *     tags:
 *       - Вебсайт
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userEmail
 *               - userRole
 *               - websiteID
 *             properties:
 *               userEmail:
 *                 type: string
 *                 example: example@gmail.com
 *               userRole:
 *                 userRole: string
 *                 example: editor
 *               websiteID:
 *                 type: string
 *                 example: 0bae8a7c-af38-49f4-a6a7-351853cb7448
 *     responses:
 *       200:
 *         description: Вебсайт успешно добавлен
 *       400:
 *         description: Не удалось добавить страницу
 *       500:
 *         description: Произошла ошибка при добавлении вебсайта
 */
router.post("/add-user", (req, res) =>
  websiteController.addUserToWebsite(req, res)
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/:
 *   get:
 *     summary: Получение всех вебсайтов у пользователя
 *     description: Получение всех вебсайтов у пользователя через ID пользователя
 *     tags:
 *       - Вебсайт
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Вебсайты успешно получены
 *       400:
 *         description: Не удалось получить вебсайты
 *       500:
 *         description: Произошла ошибка при получение вебсайтов
 */
router.get("/", (req, res) => websiteController.getWebsites(req, res));

router.post("/check-website", (req, res) =>
  websiteController.checkWebsite(req, res)
);

router.post("/get-code", (req, res) =>
  websiteController.getWebsiteCode(req, res)
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/get-users/{websiteId}:
 *   get:
 *     summary: Получение всех пользователей у вебсайта
 *     description: Получение всех пользователей у вебсайта через ID вебсайта
 *     tags:
 *       - Вебсайт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Уникальный идентификатор вебсайта
 *     responses:
 *       200:
 *         description: Пользователи вебсайта успешно получены
 *       400:
 *         description: Не удалось получить пользователей вебсайта
 *       500:
 *         description: Произошла ошибка при получение пользователей вебсайта
 */
router.get("/get-users/:websiteID", (req, res) =>
  websiteController.getWebsiteUsers(req, res)
);

router.use("/page", pageRoutes);

export default router;
