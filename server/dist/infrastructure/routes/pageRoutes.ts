import authenticateToken from "@infrastructure/middleware/authMiddleware";
import pageController from "@presentation/controllers/pageController";
import componentRoutes from "./componentRoutes";

const express = require("express");
const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/page/add:
 *   post:
 *     summary: Добавление страницы для вебсайта
 *     description: Добавление страницы для вебсайта с использованием website ID, url, name and type.
 *     tags:
 *       - Страницы
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - websiteId
 *               - url
 *               - name
 *               - type
 *             properties:
 *               websiteId:
 *                 type: string
 *                 example: 0bae8a7c-af38-49f4-a6a7-351853cb7448
 *               url:
 *                 type: string
 *                 example: https://sparkstudio.kz/
 *               name:
 *                 type: string
 *                 example: Spark Studio
 *               type:
 *                 type: string
 *                 example: Main Page
 *     responses:
 *       200:
 *         description: Страница успешно добавлена
 *       400:
 *         description: Не удалось добавить страницу
 *       500:
 *         description: Произошла ошибка при добавление страницы
 */
router.post("/add", (req, res) => pageController.addPage(req, res));

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/page/get-pages/{websiteName}:
 *   get:
 *     summary: Получение списка страниц для вебсайта
 *     description: Получение списка страниц для вебсайта через вебсайт ID.
 *     tags:
 *       - Страницы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: websiteName
 *         required: true
 *         schema:
 *           type: string
 *         description: Уникальная имя вебсайта
 *     responses:
 *       200:
 *         description: Страницы вебсайт успешно получен
 *       400:
 *         description: Не удалось получить страницы вебсайта
 *       500:
 *         description: Произошла ошибка при получение страниц
 */
router.get("/get-pages/:websiteName", (req, res) =>
  pageController.getPages(req, res)
);

router.get("/get-page/:websiteNAME/:pageID", (req, res) =>
  pageController.getPageById(req, res)
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/page/{url}:
 *   get:
 *     summary: Получение страницы
 *     description: Получение страницы через url
 *     tags:
 *       - Страницы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *           example: https://sparkstudio.kz/main-page
 *         description: Уникальный URL страницы
 *     responses:
 *       200:
 *         description: Страница успешно получена
 *       400:
 *         description: Не удалось получить страницу
 *       500:
 *         description: Произошла ошибка при получение страницы
 */
router.get("/:url", (req, res) => pageController.getPage(req, res));

router.get("/fetch-content/:website/:pageId", (req, res) =>
  pageController.fetchPageContent(req, res)
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/page/delete-page/{websiteId}:
 *   delete:
 *     summary: Удаление страницы для вебсайта
 *     description: Удаление страницы с вебсайта через вебсайт ID.
 *     tags:
 *       - Страницы
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Уникальный идентификатор вебсайта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url:
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://sparkstudio.kz/
 *     responses:
 *       200:
 *         description: Страница успешно удалена
 *       400:
 *         description: Не удалось удалить страницу
 *       500:
 *         description: Произошла ошибка при удаление страницы
 */
router.delete("/delete-page/:websiteId", (req, res) =>
  pageController.deletePages(req, res)
);

router.use("/component", componentRoutes);

export default router;
