import { Website } from "@models/websiteModel";
import { User } from "@models/userModel";
import sequelize from "config/sequelize";

class WebsiteController {
  async addWebsite(req, res) {
    try {
      const { name, url, userID } = req.body;
      const userRepository = sequelize.getRepository(User);
      const user = userRepository.findByPk(userID);

      const websiteRepositry = sequelize.getRepository(Website);

      const newWebsite = await websiteRepositry.create({
        name,
        url,
        owners: [
          {
            name: (await user).email,
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
