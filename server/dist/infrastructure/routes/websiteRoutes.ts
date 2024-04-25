import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import websiteController from "presentation/controllers/websiteController";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

// Добавление веб-сайта
router.post("/add", (req, res) => websiteController.addWebsite(req, res));

// Проверка веб-сайта
router.post("/check-website", (req, res) =>
  websiteController.checkWebsite(req, res)
);

// Добавление пользователя в веб-сайт
router.post("/add-user", (req, res) => websiteController.addUser(req, res));

// Получение сайтов пользователя по id
router.get("/", (req, res) => websiteController.getWebsites(req, res));

export default router;
