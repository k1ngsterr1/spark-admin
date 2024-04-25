import { Request, Response } from "express";
import { WebsiteRepository } from "../../infrastructure/repositories/WebsiteRepository";
import { User } from "infrastructure/models/userModel";
import { Website } from "infrastructure/models/websiteModel";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsite } from "core/use_cases/Website/GetWebsite";
import { CheckWebsite } from "@core/use_cases/Website/CheckWebsite";

import sequelize from "infrastructure/config/sequelize";
import WebsiteService from "@services/websiteService";

class WebsiteController {
  private websiteRepository: WebsiteRepository;
  private websiteService: WebsiteService;
  private addWebsiteUseCase: AddWebsite;
  private getWebsiteByOwner: GetWebsite;
  private checkWebsiteUseCase: CheckWebsite;

  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.websiteService = new WebsiteService();
    this.checkWebsiteUseCase = new CheckWebsite(this.websiteService);
    this.addWebsiteUseCase = new AddWebsite(this.websiteRepository);
    this.getWebsiteByOwner = new GetWebsite(this.websiteRepository);
  }

  // Добавление веб-сайтов
  async addWebsite(req: Request, res: Response) {
    try {
      const newWebsite = await this.addWebsiteUseCase.execute(req.body);
      res.status(201).json({ message: "Веб-сайт успешно добавлен" });
    } catch (error) {
      console.error("Ошибка с созданием веб-сайта:", error, {
        requestBody: req.body,
      });
      console.log(req.body, this.websiteRepository);
      return res.status(500).json({
        error: "Ошибка с созданием веб-сайта",
        details: error.message,
      });
    }
  }

  // Получение веб-сайтов
  async getWebsites(req: Request, res: Response) {
    try {
      const userID: number = req.user.userId;

      if (!req.user || !req.user.userId) {
        console.log("ID пользователя не существует.", { user: req.user });
        return res
          .status(400)
          .json({ message: "ID пользователя не существует." });
      }

      const websites = await this.getWebsiteByOwner.execute(userID);
      return res.status(201).json(websites);
    } catch (error) {
      console.error("Ошибка с получением сайтов:", error, {
        userId: req.user.id,
      });
      return res
        .status(500)
        .json({ error: "Ошибка с получением сайтов", details: error.message });
    }
  }

  // Добавление пользователя в список пользователей веб-сайта
  async addUser(req: Request, res: Response) {
    try {
      const { userEmail, userRole, websiteId } = req.body;
      const requesterID = req.user.id;

      const userRepository = sequelize.getRepository(User);
      const websiteRepository = sequelize.getRepository(Website);
      const website = await websiteRepository.findByPk(websiteId);

      if (!website) {
        return res.status(404).json({ message: "Веб-сайт не найден!" });
      }

      const isOwner = website.owner === requesterID;

      if (!isOwner) {
        return res
          .status(403)
          .json({ message: "Вы не владелец этого веб-сайта" });
      }

      const userToAdd = await userRepository.findOne({
        where: { email: userEmail },
      });

      if (!userToAdd) {
        return res
          .status(404)
          .json({ message: "Пользователь для добавления не найден" });
      }

      const newUserItem = {
        id: userToAdd.id,
        email: userEmail,
        role: userRole,
      };

      website.users = [...website.users, newUserItem];
      await website.save();
      res
        .status(200)
        .json({ message: "Пользователь успешно добавлен", website });
    } catch (error) {
      console.error("Ошибка с добавлением пользователя:", error);
      res.status(500).json({
        error: "Ошибка с добавлением пользователя",
        details: error.message,
      });
    }
  }

  // Проверка веб-сайта на наличие нашего мета-тэга
  async checkWebsite(req: Request, res: Response) {
    try {
      const url: string = req.body.url.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );

      const expectedCode: string = req.body.code;
      const stringifyUrl = url.toString();

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
