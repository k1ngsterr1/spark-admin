import websiteController from "presentation/controllers/websiteController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => websiteController.addWebsite(req, res));
router.post("/add-user", (req, res) => websiteController.addUser(req, res));
router.get("/", (req, res) => websiteController.getWebsites(req, res));

export default router;
