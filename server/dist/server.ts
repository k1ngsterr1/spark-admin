const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv").config({ path: ".env" });
const cookieParser = require('cookie-parser');

// imports
import authRoutes from "infrastructure/routes/authRoutes";
import websiteRoutes from "infrastructure/routes/websiteRoutes";
import auth from "@infrastructure/middleware/authMiddleware";
const app = express();

// Allowed All Cors Origins
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// Routes:
app.post("/access", auth);
app.use("/api/auth", authRoutes);
app.use("/api/website", websiteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
