const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const bcryptjs = require("bcryptjs");

import sequelize from "infrastructure/config/sequelize";

// imports
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import authRoutes from "infrastructure/routes/authRoutes";
import authenticateToken from "infrastructure/middleware/authMiddleware";
import websiteRoutes from "infrastructure/routes/websiteRoutes";

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Routes:
app.use("/api/auth", authRoutes);
app.use("/api/website", authenticateToken, websiteRoutes);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(User);
  console.log(Website);
});
