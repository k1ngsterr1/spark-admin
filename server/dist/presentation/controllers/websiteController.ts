import { Request, Response } from "express";
import { WebsiteRepository } from "../../infrastructure/repositories/WebsiteRepository";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsites } from "@core/use_cases/Website/GetWebsites";
import { GetWebsite } from "@core/use_cases/Website/GetWebsite";

import sequelize from "infrastructure/config/sequelize";
import { JWTService } from "@core/use_cases/User/JWTService";
import { UserPayload } from "@core/utils/types";

class WebsiteController {
  private WebsiteRepository: WebsiteRepository;
  private addWebsiteUseCase: AddWebsite;
  private getWebsitesByOwner: GetWebsites;
  private getWebsiteByName: GetWebsite;
  private jwtService: JWTService;

  constructor() {
    this.WebsiteRepository = new WebsiteRepository();
    this.addWebsiteUseCase = new AddWebsite(this.WebsiteRepository);
    this.getWebsitesByOwner = new GetWebsites(this.WebsiteRepository);
    this.getWebsiteByName = new GetWebsite(this.WebsiteRepository);
    this.jwtService = new JWTService()
  }

  async addWebsite(req: Request, res: Response) {
    try {
      const user = req.cookies.user;
      const name = req.body.name;
      const url = req.body.url;
      const ownerId = user.id;
      const ownerEmail = user.email;
      if(await this.addWebsiteUseCase.execute({ name, url, ownerId, ownerEmail }) === undefined){
        console.log("-----------------------------------------------------------");
      }
      const newWebsite = await this.addWebsiteUseCase.execute({ name, url, ownerId, ownerEmail });
      res.status(201).json({ message: "Веб-сайт успешно добавлен" });
    } catch (error) {
      console.error("Ошибка с созданием веб-сайта:", error);
      return res.status(500).json({ error: "Ошибка с созданием веб-сайта" });
    }
  }

  async getWebsites(req: Request, res: Response) {
    try {
      const userID: number = res.cookie.user.id;
      const websites = await this.getWebsitesByOwner.execute(userID);
      return res.status(201).json(websites);
    } catch (error) {
      console.error("Ошибка с получением сайтов:", error);
      return res.status(500).json({ error: "Ошибка с получением сайтов" });
    }
  }

  async getWebsite(req: Request, res: Response){
    try{
      const userID: number = req.user.id;
      const name: string = req.body.name;
      const website = await this.getWebsiteByName.execute(userID, name);
      return res.status(200).json(website);
    } catch (error) {
      console.error("Ошибка с получением сайта:", error);
      return res.status(500).json({ error: "Ошибка с получением сайта" });
    }
  }
  
  async getWebsitePages(req: Request, res: Response){
    try{
      const userID: number = req.user.id;
      const name: string = req.body.name;
      const website = await this.getWebsiteByName.execute(userID, name);
      return res.status(200).json(website.pages);
    } catch (error) {
      console.error("", error);
      return res.status(500).json({ error: "Ошибка с получением страницы для веб-сайта" });
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
