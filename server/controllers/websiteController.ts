import { Website } from "@models/websiteModel";
import { User } from "@models/userModel";
import sequelize from "config/sequelize";

class WebsiteController {
  async addWebsite(req, res) {
    try {
      const { name, url } = req.body;
      const userID = req.user.id;

      const websiteRepositry = sequelize.getRepository(Website);

      const newWebsite = await websiteRepositry.create({
        name,
        url,
        owners: [
          {
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

  // async getWebsites(req,res){
  //   try{
  //     const {userEmail} = req.body
  //   }
  // }
}
export default new WebsiteController();
