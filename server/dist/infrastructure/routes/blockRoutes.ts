import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import blockController from "@presentation/controllers/blockController";

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
 * /api/block/add-component:
 *   post:
 *     summary: Добавление компонента в блок
 *     description: Добавляет новый компонент в указанный блок, используя предоставленные данные.
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
 *               - blockName
 *               - name
 *               - text
 *               - componentId
 *             properties:
 *               blockName:
 *                 type: string
 *                 description: Название блока, в который будет добавлен компонент
 *               name:
 *                 type: string
 *                 description: Название компонента
 *               text:
 *                 type: string
 *                 description: Текстовое содержимое компонента
 *               componentId:
 *                 type: string
 *                 description: Идентификатор компонента
 *     responses:
 *       201:
 *         description: Компонент успешно создан.
 *       400:
 *         description: Ошибка в данных.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.post("/add-component", (req, res) => blockController.addComponent(req, res));

export default router;