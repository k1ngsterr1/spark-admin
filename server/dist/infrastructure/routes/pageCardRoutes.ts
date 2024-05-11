import pageCardController from "@presentation/controllers/pageCardController";

const express = require("express");
const router = express.Router();

router.post('/add', (req, res) => pageCardController.addPageCard(req, res));

export default router;
