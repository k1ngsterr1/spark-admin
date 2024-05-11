import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import pageCardController from "@presentation/controllers/pageCardController";

const express = require("express");
const router = express.Router();

// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

router.post("/add", (req, res) => pageCardController.addPageCard(req, res));
router.post("/add-block", (req, res) => pageCardController.addBlock(req, res));

router.get("/render/:pageCardName", (req, res) => pageCardController.render(req, res));

export default router;
