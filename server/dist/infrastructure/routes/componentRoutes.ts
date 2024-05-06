const express = require("express");
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import componentController from "@presentation/controllers/componentController";

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/website/page/component/add:
 *   post:
 *     summary: Добавление компоненты для страницы
 *     description: Добавление компоненты для страницы с использованием URL страницы, названия компоненты, текста и его номера. Только для Spark Admin'ов
 *     tags:
 *       - Компоненты
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - name
 *               - text
 *               - blockId
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL страницы для добавления компоненты
 *                 example: https://sparkstudio.kz/main-page
 *               name:
 *                 type: string
 *                 description: Название компоненты
 *                 example: button
 *               text:
 *                 type: string
 *                 description: Текст в компоненте
 *                 example: Это моя кнопка
 *               blockId:
 *                 type: number
 *                 description: Идентификатор блока на странице
 *                 example: 1
 *     responses:
 *       200:
 *         description: Компонент успешно добавлен
 *       400:
 *         description: Ошибка в данных запроса
 *       500:
 *         description: Серверная ошибка при попытке добавления компоненты
 */
router.post("/add", (req, res) => componentController.addComponent(req, res));

router.post("/save", (req, res)=> componentController)

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/website/page/component/delete:
 *   delete:
 *     summary: Удаление компоненты для страницы
 *     description: Удаление компоненты для страницы с использованием ID, только для Spark Admin'ов
 *     tags:
 *       - Компоненты
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
 *             properties:
 *               id:
 *                 type: number
 *                 description: ID компонента для удаления
 *                 example: 1
 *     responses:
 *       200:
 *         description: Компонент успешно удален
 *       400:
 *         description: Ошибка в данных запроса
 *       500:
 *         description: Серверная ошибка при попытке удаление компоненты
 */
router.delete("/delete", (req, res) => componentController.deleteComponent(req, res));

export default router;
