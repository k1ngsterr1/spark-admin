import { Request, Response } from "express";
import { WebsiteRepository } from "../../infrastructure/repositories/WebsiteRepository";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsites } from "@core/use_cases/Website/GetWebsites";
import { GetWebsite } from "@core/use_cases/Website/GetWebsite";

import sequelize from "infrastructure/config/sequelize";
import { JWTService } from "@core/use_cases/User/JWTService";
import { AddUserRequest, AddWebsiteRequest, UserPayload } from "@core/utils/types";
import refresh from "@infrastructure/middleware/authMiddleware";
import { AddUser } from "@core/use_cases/Website/AddUser";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

class WebsiteController {
  private WebsiteRepository: WebsiteRepository;
  private UserRepository: UserRepository;
  private addWebsiteUseCase: AddWebsite;
  private getWebsitesByOwner: GetWebsites;
  private getWebsiteByName: GetWebsite;
  private jwtService: JWTService;
  private addUser: AddUser;

  constructor() {
    this.WebsiteRepository = new WebsiteRepository();
    this.UserRepository = new UserRepository();
    this.addWebsiteUseCase = new AddWebsite(this.WebsiteRepository);
    this.getWebsitesByOwner = new GetWebsites(this.WebsiteRepository);
    this.getWebsiteByName = new GetWebsite(this.WebsiteRepository);
    this.addUser = new AddUser(this.WebsiteRepository, this.UserRepository);
    this.jwtService = new JWTService();
  }

  async addWebsite(req: Request, res: Response) {
    try {
      if(await (req.cookies.access) === undefined){
        throw new Error("Please reload page!");
      }
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const request: AddWebsiteRequest = {
        name: req.body.name,
        url: req.body.url,
        id: user.id,
        email: user.email
      };
      const newWebsite = await this.addWebsiteUseCase.execute(request);
      res.status(201).json({ message: "Веб-сайт успешно добавлен" });
    } catch (error) {
      console.error("Ошибка с созданием веб-сайта:", error);
      return res.status(500).json({ error: "Ошибка с созданием веб-сайта" });
    }
  }

  async getWebsites(req: Request, res: Response) {
    try {
      if(req.cookies.access === undefined){
        throw new Error("Please reload page!");
      }
      const user = this.jwtService.getAccessPayload(req.cookies.access);

      const id: number = user.id;

      const websites = await this.getWebsitesByOwner.execute(id);
      return res.status(201).json(websites);
    } catch (error) {
      console.error("Ошибка с получением сайтов:", error);
      return res.status(500).json({ error: "Ошибка с получением сайтов" });
    }
  }

  async getWebsite(req: Request, res: Response){
    try{
      if(req.cookies.access === undefined){
        throw new Error("Please reload page!");
      }
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const id: number = user.id;
      const name: string = req.body.name;
      const website = await this.getWebsiteByName.execute(id, name);
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

  async addUserToWebsite(req, res) {
    try {
      if(req.cookies.access == undefined){
        throw new Error("Please reload page!");
      }
      const { userEmail, userRole, websiteID } = req.body;
      const user = this.jwtService.getAccessPayload(await req.cookies.access);

      const request: AddUserRequest = {
        email: userEmail,
        role: userRole,
        websiteID: websiteID,
        requesterID: user.id
      }

      const website = await this.addUser.execute(request);

      res.status(200).json({ message: "User added successfully", website });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Failed to add user" });
    }
  }
}

export default new WebsiteController();
