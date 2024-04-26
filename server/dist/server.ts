const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: ".env" });
const cookieParser = require("cookie-parser");

// imports
import authRoutes from "infrastructure/routes/authRoutes";
import websiteRoutes from "infrastructure/routes/websiteRoutes";
import auth from "@infrastructure/middleware/authMiddleware";
import pageRoutes from "@infrastructure/routes/pageRoutes";
import userRoutes from "@infrastructure/routes/userRoutes";
import { swaggerSpec, swaggerUi } from "@core/utils/swagger";
import { accessToken } from "@infrastructure/middleware/authMiddleware";

const app = express();

// Создание сваггер роута
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Разрешены все Origins
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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /access:
 *   post:
 *     summary: Generate a new access token for a user.
 *     description: Generate a new access token for a user with a valid refresh token.
 *     tags:
 *       - Access Token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Access token generated successfully.
 *       400:
 *         description: Access token failed to generate.
 */
app.post("/access", (req, res) => accessToken(req, res));
app.use("/api/auth", authRoutes);
app.use("/api/page", pageRoutes);
app.use("api/user", userRoutes);
app.use("/api/website", websiteRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
