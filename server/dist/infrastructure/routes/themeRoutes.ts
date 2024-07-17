import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import themeController from "@presentation/controllers/themeController";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

router.post("/change-theme", (req, res) =>
  themeController.changeTheme(req, res)
);

export default router;
