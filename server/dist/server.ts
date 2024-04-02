const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const cookieParser = require('cookie-parser');

// imports
import authRoutes from "infrastructure/routes/authRoutes";
import websiteRoutes from "infrastructure/routes/websiteRoutes";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// Routes:
app.use("/api/auth", authRoutes);
app.use("/api/website", websiteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
