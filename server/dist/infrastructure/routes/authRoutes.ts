import userController from "presentation/controllers/userController";

const express = require("express");
const router = express.Router();
import auth from "@infrastructure/middleware/authMiddleware";

router.post("/register", (req, res) => userController.createUser(req, res));

router.post("/login", (req, res, next) => userController.login(req, res, next));

router.post("/initiate-password-change", auth, (req, res) =>
  userController.initiatePasswordChange(req, res)
);

router.post("/change-password", auth, (req, res) =>
  userController.changeUserPassword(req, res)
);

router.post("/verify", auth, (req, res) => userController.verifyUser(req, res));

router.post("/send-email", auth, (req, res) =>
  userController.resendVerificationEmail(req, res)
);

export default router;
