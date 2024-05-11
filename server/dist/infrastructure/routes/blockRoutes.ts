import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import blockController from "@presentation/controllers/blockController";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

router.post("/add", (req, res) => blockController.addBlock(req, res));

export default router;
