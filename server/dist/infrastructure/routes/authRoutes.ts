import userController from "presentation/controllers/userController";

const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => userController.createUser(req, res));
router.post("/login", (req, res, next) => userController.login(req, res, next));
router.post("/change-password", (req, res, next) => userController.changeUserPassword(req, res, next));
router.post("/verify", (req, res) => userController.verifyUser(req, res));

export default router;