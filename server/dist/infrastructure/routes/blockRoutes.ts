import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import blockController from "@presentation/controllers/blockController";
import blockComponentRoutes from "./blockComponentRoutes";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

/**
 * @swagger
 * /api/block/add:
 *   post:
 *     summary: Добавление блока на страницу
 *     description: Добавляет новый блок на страницу, используя предоставленные данные. Поля image_url и video_url являются необязательными.
 *     tags:
 *       - Блоки
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
 *               - title
 *               - content
 *               - css_link
 *             properties:
 *               name:
 *                 type: string
 *                 description: Уникальное имя блока
 *               title:
 *                 type: string
 *                 description: Заголовок блока
 *               content:
 *                 type: string
 *                 description: Содержимое блока
 *               css_link:
 *                 type: string
 *                 description: Ссылка на CSS файл блока
 *               image_url:
 *                 type: string
 *                 description: Ссылка на изображение для блока
 *               video_url:
 *                 type: string
 *                 description: Ссылка на видео для блока
 *     responses:
 *       200:
 *         description: Блок успешно добавлен.
 *       400:
 *         description: Ошибка в данных.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.post("/add", (req, res) => blockController.addBlock(req, res));

/**
 * @swagger
 * /api/block/get-blocks/{name}:
 *   get:
 *     summary: Получение всех блоков через их тип
 *     description: Получение всех блоков через их тип, только для верифицированных пользователей
 *     tags:
 *       - Блоки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: header
 *         description: Тип блока
 *     responses:
 *       200:
 *         description: Блок успешно получен
 *       400:
 *         description: Ошибка в данных.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.get("/get-blocks/:name", (req, res) => blockController.getBlocks(req, res));

router.use("/component", blockComponentRoutes);

export default router;