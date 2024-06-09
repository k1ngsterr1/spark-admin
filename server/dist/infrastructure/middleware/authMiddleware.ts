import { JWTService } from "@core/use_cases/User/JWTService";
import jwt from "jsonwebtoken";

const express = require("express");

const JWT_SECRET_ACCESS: string = process.env.JWT_SECRET_ACCESS;
const JWT_SECRET_REFRESH: string = process.env.JWT_SECRET_REFRESH;

const authenticateToken = async (req, res, next) => {
  // Получение токена через bearer
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Вы не предоставили JWT токен" });
  }
  try {
    const decodedUser = await jwt.verify(token, JWT_SECRET_ACCESS);
    req.user = decodedUser;
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ error: "Неверный или устаревший JWT токен." });
  }
};

export const accessToken = async (req, res) => {
  // Получение access токена
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const jwtService = new JWTService();
  console.log("Yerlan");

  if (token == null) {
    return res.status(401).json({ message: "Вы не предоставили JWT токен" });
  }
  try {
    const decodedUser = await jwt.verify(token, JWT_SECRET_REFRESH);
    const access = jwtService.generateAccessToken(decodedUser);
    res
      .status(201)
      .json({ message: "Успешно создали access токен", access: access });
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
