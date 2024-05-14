import userController from "@presentation/controllers/userController";

const express = require("express");
const router = express.Router();

// Проверка является ли пользователь спарк админом

router.post("/spark-check", (req, res) =>
  userController.checkSparkAdmin(req, res)
);

export default router;
