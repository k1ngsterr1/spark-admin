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
 * /api/block/component/add:
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
 *                 type: number
 *                 example: 1
 *                 description: Идентификатор компонента
 *     responses:
 *       201:
 *         description: Компонент успешно создан.
 *       400:
 *         description: Ошибка в данных.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.post("/add", (req, res) => blockController.addComponent(req, res));

/**
 * @swagger
 * /api/block/component/update/{id}:
 *   post:
 *     summary: Обновление компонента в блоке
 *     description: Обновляет существующий компонент в блоке, используя предоставленное новое значение.
 *     tags:
 *       - Блоки
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID компонента для обновления
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *             properties:
 *               value:
 *                 type: string
 *                 description: Новое значение компонента
 *     responses:
 *       200:
 *         description: Компонент успешно обновлен.
 *       400:
 *         description: Ошибка в данных.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.post("/update/:id", (req, res) => blockController.updateComponent(req, res));

export default router;