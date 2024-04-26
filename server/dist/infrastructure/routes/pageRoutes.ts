import authenticateToken from "@infrastructure/middleware/authMiddleware";
import pageController from "@presentation/controllers/pageController";

const express = require("express");
const router = express.Router();

router.use(authenticateToken);
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 * /api/pages/add:
 *   post:
 *     summary: Add a new page for a website
 *     description: Add a new page for a website with website id, url, name and type.
 *     tags:
 *       - Pages
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - websiteId
 *               - url
 *               - name
 *               - type
 *             properties:
 *               websiteId: 
 *                 type: string
 *                 example: 
 *               newPassword:
 *                 type: string
 *                 example: newP@ssw0rd2
 *     responses:
 *       200:
 *         description: User login successfully.
 *       400:
 *         description: Login failed.
 */
router.post("/add", (req, res) => pageController.addPage(req, res));
router.get("/get-pages/:websiteId", (req, res) => pageController.getPages(req, res));
router.delete("/delete/:websiteId", (req, res) => pageController.deletePages(req, res));

export default router;
