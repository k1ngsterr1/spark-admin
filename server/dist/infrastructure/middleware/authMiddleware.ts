import jwt from "jsonwebtoken";

const express = require("express");

const JWT_SECRET = process.env.JWT_SECRET_ACCESS;

const authenticateToken = (req, res, next) => {
  // Получение токена через bearer
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Вы не предоставили JWT токен" });
  }
  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    req.user = decodedUser;

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ error: "Неверный или устаревший JWT токен." });
  }
};

const app = express();

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Это защищенный путь" });
});

export default authenticateToken;
