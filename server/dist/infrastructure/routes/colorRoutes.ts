import colorController from "@presentation/controllers/colorController";
import authenticateToken from "@infrastructure/middleware/authMiddleware";
import advancedLogger from "@infrastructure/middleware/advancedLogger";

const express = require("express");
const router = express.Router();

router.use(authenticateToken);
router.use(advancedLogger);

router.post("/add", (req, res) => colorController.addColor(req, res));

router.post("/user", (req, res) => colorController.addUserColor(req, res));

router.get("/user", (req, res) => colorController.getUserColor(req, res));

router.delete("/user/:value", (req, res) =>
  colorController.deleteUserColor(req, res)
);

router.post("/website", (req, res) =>
  colorController.addWebsiteColor(req, res)
);

router.get("/website/:websiteId", (req, res) =>
  colorController.getWebsiteColor(req, res)
);

router.delete("/website/:websiteId/:value", (req, res) =>
  colorController.deleteWebsiteColor(req, res)
);

export default router;
