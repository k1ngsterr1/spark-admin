const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const bodyParser = require("body-parser");
// const bundler = require("bundler");
// const { convert_to_webp } = require("wasm_image_converter");
const fs = require("fs");
const dotenv = require("dotenv").config({ path: "./.env" });

// Routes
import authRoutes from "infrastructure/routes/authRoutes";
import blogRoutes from "@infrastructure/routes/blogRoutes";
import websiteRoutes from "infrastructure/routes/websiteRoutes";
import pageRoutes from "@infrastructure/routes/pageRoutes";
import userRoutes from "@infrastructure/routes/userRoutes";
import blockRoutes from "@infrastructure/routes/blockRoutes";
import pageCardRoutes from "@infrastructure/routes/pageCardRoutes";
import siteRoutes from "@infrastructure/routes/siteRoutes";
import themeRoutes from "@infrastructure/routes/themeRoutes";

import { swaggerSpec, swaggerUi } from "@core/utils/swagger";
import { accessToken } from "@infrastructure/middleware/authMiddleware";

import path from "path";

import { registerSocketEvents } from "@presentation/controllers/websockets/socketController";
import { SocketService } from "@infrastructure/websocket/socketServer";

const app = express();

export const buildRoute = path.join(__dirname, "templates/build/");
export const uploadPath = path.join(__dirname, "uploads");

// Server for sockets
const httpServer = require("http").createServer(app);
const socketService = new SocketService(httpServer);

// Testing
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const currentDate = new Date()
      .toJSON("kz-kz")
      .slice(0, 10)
      .replace(/:/g, "-");
    const hours = new Date().getHours().toString().padStart(2, "0");
    const minutes = new Date().getHours().toString().padStart(2, "0");
    const seconds = new Date().getSeconds().toString().padStart(2, "0");
    const currentTime = `H=${hours}-M=${minutes}-S=${seconds}`;
    const result =
      currentDate.toString() + "-" + currentTime + "-" + file.originalname;
    req.body.image = result;

    cb(null, result);
  },
});

const upload = multer({ storage: storage });

// Разрешены все Origins
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Authorization", "Content-Type"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Создание сваггера
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.use(express.static(path.join(__dirname, "templates/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

app.use(express.json());

const port = process.env.PORT;
// const port = 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  "/ferla",
  express.static(path.join(__dirname, "templates/build/ferla-bikes"))
);
app.use(
  "/ferla/*",
  express.static(path.join(__dirname, "templates/build/ferla-bikes"))
);

app.use("/images", express.static(path.join(__dirname, "uploads")));

// app.post("/convert", upload.single("image"), (req, res) => {
//   const imgBuffer = fs.readFileSync(req.file.path);
//   const quality = 25; // Set the desired quality for the WebP image

//   const webpImage = convert_to_webp(new Uint8Array(imgBuffer), quality);

//   // Optionally save or immediately send the image
//   fs.writeFileSync("output.webp", Buffer.from(webpImage));
//   res.download("output.webp", "converted_image.webp"); // This sends the converted file to the client
// });

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

// Логика для написания блога
app.use("/api/blog", blogRoutes);

// Логика для пользователей
app.use("/api/user", userRoutes);

// Логика для цветовых тем
app.use("/api/theme", themeRoutes);

// Логика для страниц
app.use("/api/page", pageRoutes);

// Логика для вебсайта
app.use("/api/website", websiteRoutes);

// Логика для блоков
app.use("/api/block", blockRoutes);

// Логика для добавления карточек страниц
app.use("/api/page-card", pageCardRoutes);

// Логика для данных сайта
app.use("/api/site", siteRoutes);

// app.use("/api/article", articleRoutes);

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
