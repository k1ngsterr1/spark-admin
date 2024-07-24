import userController from "@presentation/controllers/userController";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import advancedLogger from "@infrastructure/middleware/advancedLogger";

const express = require("express");
const router = express.Router();

router.use(authenticateToken);
router.use(advancedLogger);

// Проверка является ли пользователь спарк админом
router.post("/spark-check", (req, res) =>
  userController.checkSparkAdmin(req, res)
);

// Смена темы пользователя
router.post("/change-theme", (req, res) =>
  userController.changeTheme(req, res)
);

// Получение темы пользователя
router.get("/get-theme", (req, res) => userController.getTheme(req, res));

// Смена языка пользователя
router.post("/change-language", (req, res) =>
  userController.changeLanguage(req, res)
);

router.get("/get-language", (req, res) => userController.getLanguage(req, res));

export default router;
