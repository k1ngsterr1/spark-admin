const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const bcryptjs = require("bcryptjs");

// imports
import authRoutes from "@routes/authRoutes";

const app = express();
const port = process.env.PORT;

app.use(express.json());

// Routes:
app.use("/api/auth", authRoutes);

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
