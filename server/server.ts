const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const bcryptjs = require("bcryptjs");

import sequelize from "config/sequelize";

// imports
import { User } from "@models/userModel";
import { Website } from "@models/websiteModel";
import authRoutes from "@routes/authRoutes";
import authenticateToken from "@middleware/authMiddleware";
import websiteRoutes from "@routes/websiteRoutes";

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
