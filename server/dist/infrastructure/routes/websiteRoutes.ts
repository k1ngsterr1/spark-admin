import websiteController from "presentation/controllers/websiteController";
import auth from "@infrastructure/middleware/authMiddleware"

const express = require("express");
const router = express.Router();

router.post("/add", auth, (req, res) => websiteController.addWebsite(req, res));
router.post("/add-user", auth, (req, res) => websiteController.addUserToWebsite(req, res));
router.get("/", auth, (req, res) => websiteController.getWebsites(req, res));
router.get("/get-website", auth, (req, res) => websiteController.getWebsite(req,res));

export default router;
