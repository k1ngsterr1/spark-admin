import websiteController from "presentation/controllers/websiteController";
import pageRoutes from "./pageRoutes";

import advancedLogger from "@infrastructure/middleware/advancedLogger";
import authenticateToken from "@infrastructure/middleware/authMiddleware";

const express = require("express");
const router = express.Router();
const { extractZip } = require("@services/extractZip");

// Проверка JWT токена
router.use(authenticateToken);
// Логгер
router.use(advancedLogger);

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
    const result =
      currentDate.toString() + "-" + currentTime + "-" + file.originalname;
    req.body.image = result;

    cb(null, result);
  },
});

const buildTemporaryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "templates/temporary");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date()
      .toJSON("kz-kz")
      .slice(0, 10)
      .replace(/:/g, "-");
    const seconds = new Date().getSeconds().toString().padStart(2, "0");
    const currentTime = `SPARK-${seconds}`;
    const result =
      currentDate.toString() + "-" + currentTime + "-" + file.originalname;
    req.body.file = result;

    cb(null, result);
  },
});

const upload = multer({ storage: storage });
const uploadWebsite = multer({ storage: buildTemporaryStorage });

router.post("/add", (req, res) => websiteController.addWebsite(req, res));

router.post("/add-user", (req, res) =>
  websiteController.addUserToWebsite(req, res)
);

router.get("/", (req, res) => websiteController.getWebsites(req, res));

router.post("/verify-website", (req, res) =>
  websiteController.verifyWebsite(req, res)
);

router.post("/get-code", (req, res) =>
  websiteController.getWebsiteCode(req, res)
);

router.get("/get-users/:websiteID", (req, res) =>
  websiteController.getWebsiteUsers(req, res)
);

router.get("/users", (req, res) =>
  websiteController.getAllWebsitesUsers(req, res)
);

router.post("/upload-website", uploadWebsite.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  websiteController.uploadWebsite(req, res);
});

router.get("/get-elements/:url", (req, res) =>
  websiteController.getElementsFromWebsite(req, res)
);

router.post("/check-verification", (req, res) =>
  websiteController.checkVerification(req, res)
);

router.delete("/delete", (req, res) =>
  websiteController.deleteWebsite(req, res)
);

// Ferla Bikes here:
router.post(
  "/ferla-bikes/:websiteId/add-cart",
  upload.single("image"),
  (req, res) => websiteController.addFerlaCart(req, res)
);

router.post(
  "/ferla-bikes/:websiteId/update-cart",
  upload.single("image"),
  (req, res) => websiteController.updateFerlaCart(req, res)
);

router.delete("/ferla-bikes/:websiteId/delete-cart/:cartId/:url", (req, res) =>
  websiteController.deleteFerlaCart(req, res)
);

router.get("/ferla-bikes/:websiteId/get-carts", (req, res) =>
  websiteController.getFerlaCarts(req, res)
);

router.delete(
  "/ferla-bikes/:websiteId/delete-form/:formId/:url",
  (req, res) => {
    websiteController.deleteFerlaForms(req, res);
  }
);

router.post("/ferla-bikes/:websiteId/add-form", (req, res) =>
  websiteController.addFerlaForms(req, res)
);

router.use("/page", pageRoutes);

export default router;
