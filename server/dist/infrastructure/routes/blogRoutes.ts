import authenticateToken from "@infrastructure/middleware/authMiddleware";
import blogController from "@presentation/controllers/blogController";

const express = require("express");
const router = express.Router();

router.use(authenticateToken);

router.post("/add", (req, res) => blogController.addCardBlog(req, res));
