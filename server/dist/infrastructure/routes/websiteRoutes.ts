import websiteController from "presentation/controllers/websiteController";
import pageRoutes from "./pageRoutes";

import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";

const express = require("express");
const router = express.Router();
// Проверка JWT токена
router.use(authenticateToken);
router.use(advancedLogger);

router.post("/add", (req, res) => websiteController.addWebsite(req, res));
router.post("/add-user", (req, res) =>
  websiteController.addUserToWebsite(req, res)
);
router.get("/", (req, res) => websiteController.getWebsites(req, res));
router.get("/get-website", (req, res) =>
  websiteController.getWebsites(req, res)
);
router.get("/get-users/:websiteID", (req, res) => websiteController.getWebsiteUsers(req, res));

router.use("/pages", pageRoutes);

export default router;
