const express = require("express");
const cheerio = require("cheerio");
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
const cors = require("cors");
const port = process.env.PORT;

// Allowed All Cors Origins
// const corsOptions = {
//   origin: function (origin, callback) {
//     callback(null, true);
//   },
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: ["Authorization", "Content-Type"],
// };

app.use(express.json());
app.use(cors());
// app.options("*", cors());

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
