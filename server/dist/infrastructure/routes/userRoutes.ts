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

export default router;
