const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");

// imports
import authRoutes from "infrastructure/routes/authRoutes";
import websiteRoutes from "infrastructure/routes/websiteRoutes";
import pageRoutes from "@infrastructure/routes/pageRoutes";
import userRoutes from "@infrastructure/routes/userRoutes";
import { swaggerSpec, swaggerUi } from "@core/utils/swagger";
import { accessToken } from "@infrastructure/middleware/authMiddleware";
import blockRoutes from "@infrastructure/routes/blockRoutes";
import pageCardRoutes from "@infrastructure/routes/pageCardRoutes";

const app = express();

// Создание сваггера
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// Разрешены все Origins
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Authorization", "Content-Type"],
};

app.set("view engine", "ejs");
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Статичные файлы:

app.use(express.static(path.join(__dirname, "public")));

// Статичные стили
app.use(
  "/css",
  express.static(path.join(__dirname, "public/css"), {
    setHeaders: function (res, path, stat) {
      // Кэширование
      res.set("Cache-Control", "public, max-age=31557600"); // 1 год
    },
  })
);

// Статичные скрипты
app.use(
  "/js",
  express.static(path.join(__dirname, "public/js"), {
    setHeaders: function (res, path, stat) {
      // Кэширование
      res.set("Cache-Control", "public, max-age=31557600"); // 1 год
    },
  })
);

// Сжатие
app.use(compression());

// Роуты:

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /access:
 *   post:
 *     summary: Создание нового access token'а
 *     description: Создание нового access token'а с помощью валидного refresh token'a
 *     tags:
 *       - Access Token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Access token был успешно создан
 *       400:
 *         description: Не удалось создать access token'a
 *       500:
 *         description: Произошла ошибка при создание access token'a
 */
app.post("/access", (req, res) => accessToken(req, res));

// Логика для аутентификация
app.use("/api/auth", authRoutes);

// Логика для пользователей
app.use("/api/user", userRoutes);

// Логика для страниц
app.use("/api/page", pageRoutes);

// Логика для вебсайта
app.use("/api/website", websiteRoutes);

app.use("/api/block", blockRoutes);

app.use("/api/page-card", pageCardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
