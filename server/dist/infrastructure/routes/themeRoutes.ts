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

router.get("/get-theme", (req, res) => themeController.getTheme(req, res));

export default router;
