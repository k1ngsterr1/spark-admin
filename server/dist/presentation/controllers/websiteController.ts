import { Request, Response } from "express";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsites } from "@core/use_cases/Website/GetWebsites";
import { GetWebsite } from "@core/use_cases/Website/GetWebsite";
import { JWTService } from "@core/use_cases/User/JWTService";
import { CheckWebsite } from "@core/use_cases/Website/CheckWebsite";
import { AddUser } from "@core/use_cases/Website/AddUser";
import { AddUserRequest, AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";
import WebsiteService from "@services/websiteService";
import { Website } from "@infrastructure/models/websiteModel";

class WebsiteController {
  private addWebsiteUseCase: AddWebsite;
  private getWebsitesByOwner: GetWebsites;
  private getWebsiteByName: GetWebsite;
  private jwtService: JWTService;
  private addUser: AddUser;
  private websiteService: WebsiteService;
  private checkWebsiteUseCase: CheckWebsite;

  constructor() {
    this.websiteService = new WebsiteService();
    this.addWebsiteUseCase = new AddWebsite();
    this.getWebsitesByOwner = new GetWebsites();
    this.getWebsiteByName = new GetWebsite();
    this.addUser = new AddUser();
    this.jwtService = new JWTService();
    this.checkWebsiteUseCase = new CheckWebsite(this.websiteService);
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
  async checkWebsite(req: Request, res: Response) {
    try {
      const url: string = req.body.url.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );

      const expectedCode: string = req.body.code;
      const stringifyUrl = url.toString();

      // ! Засунуть в use_case
      const website: Website = await this.websiteRepository.findByUrl(url);
      const existingURL: string = website?.url;

      const checkWebsite: boolean = await this.checkWebsiteUseCase.execute(
        existingURL,
        expectedCode
      );

      if (website === null || undefined) {
        return res
          .status(404)
          .json({ message: "Веб-сайта с данной ссылкой не существует :(" });
      }

      if (url === null) {
        return res.status(400).json({ message: "Введите корректную ссылку" });
      }

      if (!expectedCode) {
        return res
          .status(400)
          .json({ message: "Пожалуйста введите код верификации" });
      }

      if (!url || !existingURL) {
        return res
          .status(400)
          .json({ message: "Введите URL сайта, который хотите подключить" });
      }

      if (checkWebsite === false) {
        return res.status(422).json({ message: "Сайт не был подтвержден" });
      }

      return res.status(201).json({ message: "Сайт был успешно проверен!" });
    } catch (error) {
      console.error("Ошибка с проверкой веб-сайта:", error, { url: req.body });
      res.status(500).json({
        error: "Ошибка с проверкой веб-сайта",
        details: error.message,
      });
    }
  }
}

export default new WebsiteController();
