import jwt from "jsonwebtoken";

const express = require("express");

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (token == null) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    // Attach the user information to the request object
    req.user = decodedUser;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

const app = express();

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

export default authenticateToken;
