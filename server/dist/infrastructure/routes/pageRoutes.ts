import pageController from "@presentation/controllers/pageController";
import auth from "@infrastructure/middleware/authMiddleware"

const express = require("express");
const router = express.Router();

router.post("/add", auth, (req, res) => pageController.addPage(req, res));

export default router;
