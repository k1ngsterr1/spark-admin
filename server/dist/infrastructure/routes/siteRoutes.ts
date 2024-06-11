import authenticateToken from "@infrastructure/middleware/authMiddleware";
import advancedLogger from "@infrastructure/middleware/advancedLogger";
import siteController from "@presentation/controllers/siteController";
import path from "path";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date()
      .toJSON("kz-kz")
      .slice(0, 10)
      .replace(/:/g, "-");
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes = new Date().getHours().toString().padStart(2, "0");
    const seconds = new Date().getSeconds().toString().padStart(2, "0");
    const currentTime = `H=${hours}-M=${minutes}-S=${seconds}`;
    let result =
      currentDate.toString() + "-" + currentTime + "-" + file.originalname;
    req.body.image = result;

    cb(null, result);
  },
});

const upload = multer({ storage: storage });

export const buildRoute: string = path.join(
  __dirname,
  "../../",
  "templates/build/"
);

const express = require("express");
const router = express.Router();

// router.use(authenticateToken);
router.use(advancedLogger);

router.post(
  "/add",
  authenticateToken,
  async (req, res) => await siteController.addSiteData(req, res)
);

router.post(
  "/update/:componentId",
  authenticateToken,
  async (req, res) => await siteController.updateSite(req, res)
);

router.post(
  "/upload/image",
  authenticateToken,
  upload.single("editable-image"),
  async (req, res) => await siteController.uploadImage(req, res)
);

router.get(
  "/content/:url",
  async (req, res) => await siteController.getSite(req, res)
);

// router.use("/agro", express.static(path.join(buildRoute, 'agro')));

export default router;
