import userController from "@controllers/userController";

const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => userController.createUser(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.post("/change-password", (req, res) =>
  userController.changeUserPassword(req, res)
);

export default router;
