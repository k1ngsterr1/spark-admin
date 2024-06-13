import { Request, Response } from "express";
import { AddWebsite } from "core/use_cases/Website/AddWebsite";
import { GetWebsites } from "@core/use_cases/Website/GetWebsites";
import { GetWebsite } from "@core/use_cases/Website/GetWebsite";
import { CheckWebsite } from "@core/use_cases/Website/CheckWebsite";
import { AddUser } from "@core/use_cases/Website/AddUser";
import { AddUserRequest, AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";
import { GetWebsiteUsers } from "@core/use_cases/Website/GetWebsiteUsers";
import { GetWebsiteElements } from "@core/use_cases/Website/GetWebsiteElements";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import { GetWebsitesCode } from "@core/use_cases/Website/GetWebsiteCode";
import { AllWebsitesUsers } from "@core/use_cases/Website/GetAllWebsitesUsers";
import { DeleteWebsite } from "@core/use_cases/Website/DeleteWebsite";
import { CheckVerification } from "@core/use_cases/Website/CheckVerification";
import WebsiteService from "@services/websiteService";
import { CartDetails } from "@core/utils/Website/Ferla-bikes/types";
import { AddCart } from "@core/use_cases/Website/CRUD/Ferla-bikes/AddCart";
const fs = require("fs").promises;
import path from "path";
import { uploadPath } from "server";
import { UpdateCart } from "@core/use_cases/Website/CRUD/Ferla-bikes/UpdateCart";
import { DeleteCart } from "@core/use_cases/Website/CRUD/Ferla-bikes/DeleteCart";
import { GetCarts } from "@core/use_cases/Website/CRUD/Ferla-bikes/GetCarts";

class WebsiteController {
  private addWebsiteUseCase: AddWebsite;
  private websiteRepository: WebsiteRepository;
  private getWebsitesByOwner: GetWebsites;
  private checkVerificationUseCase: CheckVerification;
  private getWebsiteByName: GetWebsite;
  private getWebsiteCodeUseCase: GetWebsitesCode;
  private addUser: AddUser;
  private websiteService: WebsiteService;
  private checkWebsiteUseCase: CheckWebsite;
  private websiteUsers: GetWebsiteUsers;
  private getWebsiteElements: GetWebsiteElements;
  private allWebsitesUsers: AllWebsitesUsers;
  private deleteWebsiteByUrl: DeleteWebsite;
  private ferlaAddCart: AddCart;
  private ferlaUpdateCart: UpdateCart;
  private ferlaGetCarts: GetCarts;
  private ferlaDeleteCart: DeleteCart;

  constructor() {
    this.websiteService = new WebsiteService();
    this.checkVerificationUseCase = new CheckVerification();
    this.getWebsiteCodeUseCase = new GetWebsitesCode();
    this.websiteRepository = new WebsiteRepository();
    this.addWebsiteUseCase = new AddWebsite();
    this.getWebsitesByOwner = new GetWebsites();
    this.getWebsiteByName = new GetWebsite();
    this.addUser = new AddUser();
    this.websiteUsers = new GetWebsiteUsers();
    this.checkWebsiteUseCase = new CheckWebsite(
      this.websiteService,
      this.websiteRepository
    );
    this.getWebsiteElements = new GetWebsiteElements();
    this.allWebsitesUsers = new AllWebsitesUsers();
    this.deleteWebsiteByUrl = new DeleteWebsite();
    this.ferlaAddCart = new AddCart();
    this.ferlaUpdateCart = new UpdateCart();
    this.ferlaGetCarts = new GetCarts();
    this.ferlaDeleteCart = new DeleteCart();
  }

  // Добавление веб-сайта
  async addWebsite(req: Request, res: Response): Promise<void> {
    let errors: ErrorDetails[] = [];
    try {
      const request: AddWebsiteRequest = {
        name: req.body.name,
        url: req.body.url,
        ownerID: req.user.id,
        ownerEmail: req.user.email,
      };

      const newWebsite = await this.addWebsiteUseCase.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res
        .status(201)
        .json({ message: "Веб-сайт успешно добавлен", website: newWebsite });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Ошибка с созданием веб-сайта: ${error}` });
    }
  }

  //Получение всех вебсайтов
  async getWebsites(req: Request, res: Response): Promise<void> {
    let errors: ErrorDetails[] = [];
    try {
      const userID: number = req.user.id;

      const websites = await this.getWebsitesByOwner.execute(userID, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      return res.status(201).json(websites);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Ошибка с получением сайтов", details: error.message });
    }
  }

  //Add cart to ferla-bikes
  async addFerlaCart(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId: number = req.user.id;
      const websiteId: string = req.params.websiteId;
      const url: string = req.body.url;
      const imgPath = path.join(uploadPath, req.body.image);
      const cartDetails: CartDetails = {
        name: req.body.name,
        description: req.body.description,
        img_url: imgPath,
        price: req.body.price,
      };

      const cart = await this.ferlaAddCart.execute(
        userId,
        websiteId,
        url,
        cartDetails,
        errors
      );

      await fs.unlink(imgPath, (error: unknown | any) => {
        if (error) {
          throw new Error(error.message);
        }
      });

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(201).json({ message: "Успешно создали тележку.", cart: cart });
    } catch (error) {
      console.log(error);
      const imgPath = path.join(uploadPath, req.body.image);
      try {
          await fs.unlink(imgPath);
      } catch (fileError) {
          console.log("Image problem in add ferla cart");
      }
      res.status(500).json({ message: "Ошибка при добавление тележки." });
    }
  }

  async updateFerlaCart(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId: number = req.user.id;
      const websiteId: string = req.params.websiteId;
      const url: string = req.body.url;
      const cartId: number = req.body.cartId;
      const imgPath = path.join(uploadPath, req.body.image);
      const cartDetails: CartDetails = {
        name: req.body.name,
        description: req.body.description,
        img_url: imgPath,
        price: req.body.price,
      };

      const cart = await this.ferlaUpdateCart.execute(
        userId,
        websiteId,
        url,
        cartId,
        cartDetails,
        errors
      );

      if (imgPath) {
        await fs.unlink(imgPath, (error: unknown | any) => {
          if (error) {
            throw new Error(error.message);
          }
        });
      }

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res
        .status(200)
        .json({ message: "Успешно обновили тележку.", cart: cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при обновление тележки." });
    }
  }

  async deleteFerlaCart(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId: number = req.user.id;
      const websiteId: string = req.params.websiteId;
      const url: string = req.body.url;
      const cartId: number = req.body.cartId;

      await this.ferlaDeleteCart.execute(
        userId,
        websiteId,
        url,
        cartId,
        errors
      );

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Успешно удалили тележку." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при удаление тележки." });
    }
  }

  async getFerlaCarts(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const url: string = req.params.url;

      const carts = await this.ferlaGetCarts.execute(url, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Успешно получили тележки.", carts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при удаление тележки." });
    }
  }

  // Добавление пользователей в веб-сайт
  async addUserToWebsite(req, res): Promise<void> {
    let errors: ErrorDetails[] = [];
    try {
      const { userEmail, userRole, websiteID } = req.body;

      const request: AddUserRequest = {
        email: userEmail,
        role: userRole,
        websiteID: websiteID,
        requesterID: req.user.id,
      };

      await this.addUser.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Пользователь добавлен успешно!" });
    } catch (error) {
      console.error("Ошибка с добавлением пользователя:", error);
      res.status(500).json({ error: "Ошибка с добавлением пользователя" });
    }
  }

  // Получение пользователей веб-сайта
  async getWebsiteUsers(req: Request, res: Response): Promise<void> {
    let errors: ErrorDetails[] = [];
    try {
      const websiteID: string = req.params.websiteID;
      if (websiteID === undefined) {
        errors.push(new ErrorDetails(404, "Вебсайт ID не указан."));
      }

      const users = await this.websiteUsers.execute(websiteID, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res
        .status(200)
        .json({ message: "Пользователи были успешно получены", users: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ошибка при получение пользователей вебсайта",
      });
    }
  }

  //Получение всех вебсайтов и их пользователей
  async getAllWebsitesUsers(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const websites = await this.allWebsitesUsers.execute(errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({
        message: "Пользователи были успешно получены",
        websites: websites,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ошибка при получение пользователей со всех вебсайтов",
      });
    }
  }

  // Получить элементов с веб-сайта
  async getElementsFromWebsite(req: Request, res: Response): Promise<void> {
    let errors: ErrorDetails[] = [];
    try {
      const url: string = req.params.url;
      const userID: number = req.user.id;

      console.log("get elements from website");

      const isVerified = await this.checkVerificationUseCase.execute(
        userID,
        url,
        errors
      );

      console.log("isVerified:", isVerified);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      // Блок проверки верификации веб-сайтаb
      if (isVerified === true) {
        const websiteElements = await this.getWebsiteElements.execute(
          url,
          userID,
          errors
        );
        res.status(200).json({ elements: websiteElements });
      } else {
        throw new Error("Ваш сайт не верифицирован!");
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Не удалось получить элементы с страницы" });
    }
  }

  // Получение кода верификации для веб-сайта
  async getWebsiteCode(req: Request, res: Response): Promise<any> {
    let errors: ErrorDetails[] = [];
    try {
      const { url } = req.body;
      const ownerId = req.user.id;

      const code = await this.getWebsiteCodeUseCase.execute(
        ownerId,
        url,
        errors
      );

      const metaTag = `<meta name="spark-verification" content="${code}">`;

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      return res.status(200).json({ code: metaTag });
    } catch (error) {
      res.status(500).json({
        error: `Ошибка с получением кода веб-сайта: ${error.message}`,
      });
    }
  }

  // Верификация веб-сайта
  async verifyWebsite(req: Request, res: Response) {
    let errors: ErrorDetails[] = [];
    try {
      const { url, code: expectedCode } = req.body;
      const userID = req.user.id;

      // Regex to validate and extract URL
      const validUrl =
        url &&
        url.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );

      if (!validUrl) {
        return res.status(400).json({ message: "Введите корректную ссылку" });
      }

      const matchedUrl = validUrl[0];

      const result = await this.checkWebsiteUseCase.execute(
        userID,
        matchedUrl,
        expectedCode,
        errors
      );

      if (!result.exists) {
        return res
          .status(404)
          .json({ message: "Веб-сайта с данной ссылкой не существует :(" });
      }

      console.log("result.isValid:", result.isValid);

      if (!result.isValid) {
        return res.status(422).json({ message: "Сайт не был подтвержден" });
      }

      if (!expectedCode) {
        return res
          .status(400)
          .json({ message: "Пожалуйста введите код верификации" });
      }

      return res.status(201).json({ message: "Сайт был успешно проверен!" });
    } catch (error: any | unknown) {
      console.error("Ошибка с проверкой веб-сайта:", error);
      res.status(500).json({
        error: "Ошибка с проверкой веб-сайта",
        details: error.message,
      });
    }
  }

  // Проверка верифицирован ли сайт
  async checkVerification(req: Request, res: Response) {
    let errors: ErrorDetails[] = [];
    try {
      const { url } = req.body;
      const userID = req.user.id;

      // Regex to validate and extract URL
      const validUrl =
        url &&
        url.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );

      if (!validUrl) {
        return res.status(400).json({ message: "Введите корректную ссылку" });
      }

      const matchedUrl = validUrl[0];

      const result = await this.checkVerificationUseCase.execute(
        userID,
        matchedUrl,
        errors
      );

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      if (result === true) {
        res.status(200).json({ message: "Ваш веб-сайт успешно подтвержден!" });
      } else {
        res.status(403).json({ message: "Ваш веб-сайт не был подтвержден!" });
      }
    } catch (error: any | unknown) {
      res
        .status(500)
        .json({ message: "Ошибка при проверке верификации веб-сайта!" });
    }
  }

  // Удалить веб-сайт
  async deleteWebsite(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const url: string = req.body.url;
      const userId: number = req.user.id;

      await this.deleteWebsiteByUrl.execute(userId, url, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Веб-сайт успешно удален." });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удаления вебсайта." });
    }
  }
}

export default new WebsiteController();
