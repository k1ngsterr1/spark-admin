// import { JWTService } from "@core/use_cases/User/JWTService";
// import { UserPayload } from "@core/utils/types";

// export default async function authenticateToken(req, res, next){
//   const jwtService = new JWTService();
//   if(req.cookies.refreshToken === undefined){
//     res.status(403).json({ message: "Login Required!"});
//     throw new Error("Login Required");
//   }
//   const payload = jwtService.getRefreshPayload(req.cookies.refreshToken);
//   const user: UserPayload = {
//     id: payload.id,
//     email: payload.email,
//     role: payload.role
//   }
//   res.cookie('access', jwtService.generateAccessToken(user), { maxAge: process.env.ACCESS_COOKIE_LIFETIME, httpOnly: true });
//   next();
// }
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
