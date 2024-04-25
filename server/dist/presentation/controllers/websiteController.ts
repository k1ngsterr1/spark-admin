import { Request, Response } from "express";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsites } from "@core/use_cases/Website/GetWebsites";
import { GetWebsite } from "@core/use_cases/Website/GetWebsite";
import { JWTService } from "@core/use_cases/User/JWTService";
import { AddUser } from "@core/use_cases/Website/AddUser";
import { AddUserRequest, AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";

class WebsiteController {
  private addWebsiteUseCase: AddWebsite;
  private getWebsitesByOwner: GetWebsites;
  private getWebsiteByName: GetWebsite;
  private jwtService: JWTService;
  private addUser: AddUser;

  constructor() {
    this.addWebsiteUseCase = new AddWebsite();
    this.getWebsitesByOwner = new GetWebsites();
    this.getWebsiteByName = new GetWebsite();
    this.addUser = new AddUser();
    this.jwtService = new JWTService();
  }

  async addWebsite(req: Request, res: Response) {
    let errors: ErrorDetails[] = [];
    try {
      if(await (req.cookies.access) === undefined){
        errors.push(new ErrorDetails(401, "Unauthorized"));
      }
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const request: AddWebsiteRequest = {
        name: req.body.name,
        url: req.body.url,
        email: user.email
      };
      const newWebsite = await this.addWebsiteUseCase.execute(request, errors);
      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json(current_error.details);
        return;
      }
      res.status(201).json({ message: "Веб-сайт успешно добавлен", website: newWebsite});
    } catch (error) {
      return res.status(500).json({ error: "Ошибка с созданием веб-сайта" });
    }
  }

  async getWebsites(req: Request, res: Response) {
    try {
      const user = this.jwtService.getAccessPayload(req.cookies.access);

      const websites = await this.getWebsitesByOwner.execute(user.id);
      
      return res.status(201).json(websites);
    } catch (error) {
      console.error("Ошибка с получением сайтов:", error);
      return res.status(500).json({ error: "Ошибка с получением сайтов" });
    }
  }

  async getWebsite(req: Request, res: Response){
    try{
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const url: string = req.body.url;

      const website = await this.getWebsiteByName.execute(user.id, url);
      return res.status(200).json(website);
    } catch (error) {
      console.error("Ошибка с получением сайта:", error);
      return res.status(500).json({ error: "Ошибка с получением сайта" });
    }
  }

  async addUserToWebsite(req, res) {
    try {

      const { userEmail, userRole, websiteID } = req.body;
      const user = this.jwtService.getAccessPayload(req.cookies.access);

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
