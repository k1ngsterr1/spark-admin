import pageController from "@presentation/controllers/pageController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => pageController.addPage(req, res));

export default router;
