import advancedLogger from "@infrastructure/middleware/advancedLogger";
import languageController from "@presentation/controllers/languageController";

const express = require("express");
const router = express.Router();

// Логер
router.use(advancedLogger);

router.post("/change-language", (req, res) =>
  languageController.changeLanguage(req, res)
);

router.get("/get-language", (req, res) =>
  languageController.getLanguage(req, res)
);

export default router;
