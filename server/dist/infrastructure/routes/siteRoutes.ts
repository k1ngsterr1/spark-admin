import authenticateToken from "@infrastructure/middleware/authMiddleware";
import advancedLogger from "@infrastructure/middleware/advancedLogger";
import siteController from "@presentation/controllers/siteController";
import path from "path";

export const buildRoute: string = path.join(
  __dirname,
  "../../",
  "templates/build/"
);

const express = require("express");
const router = express.Router();

// router.use(authenticateToken);
router.use(advancedLogger);

router.get(
  "/add/:siteName/",
  authenticateToken,
  async (req, res) => await siteController.addSiteData(req, res)
);

router.post(
  "/update/:siteName/:componentId",
  async (req, res) => await siteController.updateSite(req, res)
);

// router.get("/agro", async(req, res) => await siteController.getSite(req, res));

// router.use("/agro", express.static(path.join(buildRoute, 'agro')));

export default router;
