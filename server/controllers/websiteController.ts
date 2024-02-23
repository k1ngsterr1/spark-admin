import { Website } from "@models/websiteModel";
import { User } from "@models/userModel";
import sequelize from "config/sequelize";

const { Op } = require("sequelize");

class WebsiteController {
  async addWebsite(req, res) {
    try {
      const { name, url } = req.body;
      const userID = req.user.id;
      const userEmail = req.user.email;

      const websiteRepositry = sequelize.getRepository(Website);

      const newWebsite = await websiteRepositry.create({
        name,
        url,
        owner: userID,
        users: [
          {
            email: userEmail,
            id: userID,
            role: "Owner",
          },
        ],
      });
      return res.status(201).json(newWebsite);
    } catch (error) {
      console.error("Error creating website:", error);
      return res.status(500).json({ error: "Failed to create website" });
    }
  }

  async getWebsites(req, res) {
    try {
      const userID: number = req.user.id;

      const websiteRepositry = sequelize.getRepository(Website);

      const websites = await websiteRepositry.findAll({
        where: { owner: userID },
      });
      console.log(userID);
      return res.status(201).json(websites);
    } catch (error) {
      console.error("Error with fetching websites:", error);
      return res.status(500).json({ error: "Failed to get websites" });
    }
  }
}
export default new WebsiteController();
