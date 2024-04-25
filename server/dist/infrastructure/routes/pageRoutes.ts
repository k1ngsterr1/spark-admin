import pageController from "@presentation/controllers/pageController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => pageController.addPage(req, res));
router.get("/get/:websiteId", (req, res) => pageController.getPages(req, res));
router.delete("delete/:websiteId", (req, res) => pageController.deletePages(req, res));

export default router;
