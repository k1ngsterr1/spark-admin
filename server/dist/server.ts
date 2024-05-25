const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config({ path: ".env" });

// imports
import authRoutes from "infrastructure/routes/authRoutes";
import websiteRoutes from "infrastructure/routes/websiteRoutes";
import pageRoutes from "@infrastructure/routes/pageRoutes";
import userRoutes from "@infrastructure/routes/userRoutes";
import { swaggerSpec, swaggerUi } from "@core/utils/swagger";
import { accessToken } from "@infrastructure/middleware/authMiddleware";
import blockRoutes from "@infrastructure/routes/blockRoutes";
import pageCardRoutes from "@infrastructure/routes/pageCardRoutes";
import path from "path";

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

// Serve static files from the React app

// Handles any requests that don't match the ones above
// app.use("/agro", express.static(path.join(__dirname, "templates/build/agro")));

// app.get("/agro/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "templates/build/agro", "index.html"));
// });

// Handles any requests that don't match the ones above

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
// app.use((req, res, next) => {
//   if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
//     next();
//   } else {
//     res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
//     res.header("Expires", "-1");
//     res.header("Pragma", "no-cache");
//     res.sendFile(path.join(__dirname, "templates/build/agro", "index.html"));
//   }
// });

app.use("/", express.static(path.join(__dirname, "templates/build/agro")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/build/agro", "index.html"));
});

// This code makes sure that any request that does not matches a static file
// in the build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
// app.use((req, res, next) => {
//   if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
//     next();
//   } else {
//     res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
//     res.header("Expires", "-1");
//     res.header("Pragma", "no-cache");
//     res.sendFile(path.join(__dirname, "templates/build/testing", "index.html"));
//   }
// });

// app.use('/api/agropv/static', express.static(path.join(__dirname, 'templates/public/agropv/static')));
// app.use('/api/agropv/css', express.static(path.join(__dirname, 'templates/public/agropv/css')));
// app.use('/api/agropv/js', express.static(path.join(__dirname, 'templates/public/agropv/js')));

// Serve the index.html file for any other requests to /api/agropv
// app.use('/api/agropv', (req, res) => {
//   res.sendFile(path.join(__dirname, 'templates/layouts/agropv/index.html',));
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// const port = process.env.PORT;
const port = 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Статичные стили
// app.use(
//   "/css",
//   express.static(path.join(__dirname, "public/css"), {
//     setHeaders: function (res, path, stat) {
//       // Кэширование
//       res.set("Cache-Control", "public, max-age=31557600"); // 1 год
//     },
//   })
// );

// Статичные скрипты
// app.use(
//   "/js",
//   express.static("templates/public", {
//     setHeaders: function (res, path, stat) {
//       // Кэширование
//       res.set("Cache-Control", "public, max-age=31557600"); // 1 год
//     },
//   })
// );

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
