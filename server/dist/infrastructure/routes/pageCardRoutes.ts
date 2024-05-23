import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import pageCardController from "@presentation/controllers/pageCardController";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
// router.use(authenticateToken);
// router.use(advancedLogger);

/**
 * @swagger
 * /api/page-card/add:
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *   post:
 *     summary: Добавление карточки страницы
 *     description: Создает новую карточку страницы с данными, предоставленными пользователем.
 *     tags:
 *       - Карточки страниц
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
 *               - description
 *               - type
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL карточки страницы
 *               name:
 *                 type: string
 *                 description: Название карточки страницы
 *               description:
 *                 type: string
 *                 description: Описание карточки страницы
 *               type:
 *                 type: string
 *                 description: Тип карточки страницы
 *     responses:
 *       201:
 *         description: Карточка страницы успешно добавлена.
 *       400:
 *         description: Ошибка в данных запроса.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.post("/add", (req, res) => pageCardController.addPageCard(req, res));

/**
 * @swagger
 * /api/page-card/add-block:
 *   post:
 *     summary: Добавление блока в карточку страницы
 *     description: Добавляет новый блок в карточку страницы, используя имя блока и имя карточки страницы
 *     tags:
 *       - Карточки страниц
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
 *               - pageCardName
 *             properties:
 *               blockName:
 *                 type: string
 *                 description: Название блока, который будет добавлен
 *               pageCardName:
 *                 type: string
 *                 description: Название карточки страницы, в которую добавляется блок
 *     responses:
 *       200:
 *         description: Блок успешно добавлен в карточку страницы.
 *       400:
 *         description: Ошибка в данных.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.post("/add-block", (req, res) => pageCardController.addBlock(req, res));

/**
 * @swagger
 * /api/page-card/render/business-landing:
 *   get:
 *     summary: Отображение бизнес-лендинга
 *     description: Создает бизнес лендинг из разных данних блоков
 *     tags:
 *       - Шаблоны
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Страница успешно отображена.
 *       500:
 *         description: Произошла серверная ошибка.
 */
router.get("/render/business-landing", (req, res) => pageCardController.businessLanding(req, res));

export default router;
