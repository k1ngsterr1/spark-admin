import { Website } from "@models/websiteModel";
import sequelize from "config/sequelize";

class WebsiteController {
  async addWebsite(req, res) {
    try {
      const { name, url } = req.body;
      const user = req.user;

      const websiteRepositry = sequelize.getRepository(Website);
      console.log(Website);

      const newWebsite = await websiteRepositry.create({
        name,
        url,
        owners: [
          {
            name: user.name,
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
}
export default new WebsiteController();
