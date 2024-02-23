import { User } from "@models/userModel";
import { Website } from "@models/websiteModel";
import sequelize from "config/sequelize";

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

      const optimizedWebsites = websites.map((website) => {
        return {
          name: website.name,
          url: website.url,
          owner: website.owner,
          users: website.users,
          id: website.id,
        };
      });

      console.log(userID);
      return res.status(201).json(optimizedWebsites);
    } catch (error) {
      console.error("Error with fetching websites:", error);
      return res.status(500).json({ error: "Failed to get websites" });
    }
  }

  async addUser(req, res) {
    try {
      const { userEmail, userRole, websiteId } = req.body;
      const requesterID = req.user.id;

      const userRepository = sequelize.getRepository(User);
      const websiteRepository = sequelize.getRepository(Website);
      const website = await websiteRepository.findByPk(websiteId);

      if (!website) {
        return res.status(404).json({ message: "Website not found" });
      }

      const isOwner = website.owner === requesterID;

      if (!isOwner) {
        return res
          .status(403)
          .json({ message: "You are not the owner of this website" });
      }
      const userToAdd = await userRepository.findOne({
        where: { email: userEmail },
      });

      if (!userToAdd) {
        return res.status(404).json({ message: "User not found" });
      }

      const newUserItem = {
        id: userToAdd.id,
        email: userEmail,
        role: userRole,
      };

      website.users = [...website.users, newUserItem];
      await website.save();
      res.status(200).json({ message: "User added successfully", website });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  }
}
export default new WebsiteController();
