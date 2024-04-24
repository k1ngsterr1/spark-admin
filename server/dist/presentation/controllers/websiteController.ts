import { Request, Response } from "express";
import { WebsiteRepository } from "../../infrastructure/repositories/WebsiteRepository";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsite } from "core/use_cases/Website/GetWebsite";
import { CheckWebsite } from "@core/use_cases/Website/CheckWebsite";

import sequelize from "infrastructure/config/sequelize";

class WebsiteController {
  private websiteRepository: WebsiteRepository;
  private addWebsiteUseCase: AddWebsite;
  private getWebsiteByOwner: GetWebsite;
  private checkWebsiteUseCase: CheckWebsite;

  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.checkWebsiteUseCase = new CheckWebsite(this.websiteRepository);
    this.addWebsiteUseCase = new AddWebsite(this.websiteRepository);
    this.getWebsiteByOwner = new GetWebsite(this.websiteRepository);
  }

  async addWebsite(req: Request, res: Response) {
    try {
      const newWebsite = await this.addWebsiteUseCase.execute(req.body);

      res.status(201).json({ message: "Веб-сайт успешно добавлен" });
    } catch (error) {
      console.error("Ошибка с созданием веб-сайта:", error);
      console.log(req.body, this.websiteRepository);
      return res.status(500).json({ error: "Ошибка с созданием веб-сайта" });
    }
  }

  async getWebsites(req: Request, res: Response) {
    try {
      const userID: number = req.user.id;
      const websites = await this.getWebsiteByOwner.execute(userID);
      return res.status(201).json(websites);
    } catch (error) {
      console.error("Ошибка с получением сайтов:", error);
      return res.status(500).json({ error: "Ошибка с получением сайтов" });
    }
  }

  async addUser(req: Request, res: Response) {
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

  // async checkWebsite(req: Request, res: Response) {
  //   try {
  //     const {

  //     };
  //   } catch (error) {}
  // }
}

export default new WebsiteController();
