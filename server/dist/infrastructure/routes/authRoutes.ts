import userController from "presentation/controllers/userController";

const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => userController.createUser(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post("/change-password", (req, res) =>
  userController.changeUserPassword(req, res)
);
router.post("/verify", (req, res) => userController.verifyUser(req, res));

export default router;