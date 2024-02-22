import websiteController from "@controllers/websiteController";

const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => websiteController.addWebsite(req, res));

export default router;
