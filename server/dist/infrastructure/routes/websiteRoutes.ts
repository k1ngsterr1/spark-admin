import websiteController from "presentation/controllers/websiteController";
import pageRoutes from "./pageRoutes";

import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use((req, res, next) => {
  if (req.path === '/api/website/ferla-bikes/:websiteId/get-carts') {
      return next();
  }
  authenticateToken(req, res, next);
});

router.use(advancedLogger);
router.use(authenticateToken);

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date()
      .toJSON("kz-kz")
      .slice(0, 10)
      .replace(/:/g, "-");
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes = new Date().getHours().toString().padStart(2, "0");
    const seconds = new Date().getSeconds().toString().padStart(2, "0");
    const currentTime = `H=${hours}-M=${minutes}-S=${seconds}`;
    let result =
      currentDate.toString() + "-" + currentTime + "-" + file.originalname;
    req.body.image = result;

    cb(null, result);
  },
});

const upload = multer({ storage: storage });

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

router.post("/verify-website", (req, res) =>
  websiteController.verifyWebsite(req, res)
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/website/users:
 *   get:
 *     summary: Получение всех вебсайтов с их пользователями
 *     description: Получение всех вебсайтов с их пользователями через access токен
 *     tags:
 *       - Вебсайт
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Пользователи со всех вебсайтов успешно получены
 *       400:
 *         description: Не удалось получить пользователей со всех вебсайтов
 *       500:
 *         description: Произошла ошибка при получение пользователей со всех вебсайтов
 */
router.get("/users", (req, res) =>
  websiteController.getAllWebsitesUsers(req, res)
);

/**
 * @swagger
 * /api/website/get-elements/{url}:
 *   get:
 *     summary: Получение элементов вебсайта
 *     description: Получает HTML элементы с указанного URL, используя переданный в теле запроса URL.
 *     tags:
 *       - Вебсайт
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *           example: https://samigroup.kz/
 *         description: URL вебсайта
 *     responses:
 *       200:
 *         description: Элементы успешно извлечены
 *       400:
 *         description: Ошибка в данных запроса
 *       500:
 *         description: Произошла ошибка при попытке получения элементов
 */
router.get("/get-elements/:url", (req, res) =>
  websiteController.getElementsFromWebsite(req, res)
);

router.post("/check-verification", (req, res) =>
  websiteController.checkVerification(req, res)
);

/**
 * @swagger
 * /api/website/delete:
 *   delete:
 *     summary: Удаление вебсайта
 *     description: Удаляет вебсайт, используя URL, предоставленный в теле запроса, через access токен.
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
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL вебсайта, который нужно удалить
 *                 example: https://sparkstudio.kz/
 *     responses:
 *       200:
 *         description: Вебсайт успешно удален
 *       400:
 *         description: Ошибка в данных запроса
 *       500:
 *         description: Серверная ошибка при попытке удаления вебсайта
 */
router.delete("/delete", (req, res) =>
  websiteController.deleteWebsite(req, res)
);

router.post(
  "/ferla-bikes/:websiteId/add-cart",
  upload.single("image"),
  (req, res) => websiteController.addFerlaCart(req, res)
);

router.post(
  "/ferla-bikes/:websiteId/update-cart",
  upload.single("image"),
  (req, res) => websiteController.updateFerlaCart(req, res)
);

router.delete("/ferla-bikes/:websiteId/delete-cart", (req, res) =>
  websiteController.deleteFerlaCart(req, res)
);

router.get("/ferla-bikes/:websiteId/get-carts", (req, res) =>
  websiteController.getFerlaCarts(req, res)
);

router.use("/page", pageRoutes);

export default router;
