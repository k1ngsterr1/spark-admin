import { AddColor } from "@core/use_cases/Color/AddColor";
import { AddUserColor } from "@core/use_cases/Color/AddUserColor";
import { AddWebsiteColor } from "@core/use_cases/Color/AddWebsiteColor";
import { DeleteUserColor } from "@core/use_cases/Color/DeleteUserColor";
import { DeleteWebsiteColor } from "@core/use_cases/Color/DeleteWebsiteColor";
import { GetUserColor } from "@core/use_cases/Color/GetUserColor";
import { GetWebsiteColor } from "@core/use_cases/Color/GetWebsiteColor";
import {
  AddColorRequest,
  AddWebsiteColorRequest,
} from "@core/utils/Color/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class ColorController {
  private addColorUseCase: AddColor;
  private addUserColorUseCase: AddUserColor;
  private addWebsiteColorUseCase: AddWebsiteColor;
  private getUserColorUseCase: GetUserColor;
  private getWebsiteColorUseCase: GetWebsiteColor;
  private deleteUserColorUseCase: DeleteUserColor;
  private deleteWebsiteColorUseCase: DeleteWebsiteColor;
  constructor() {
    this.addColorUseCase = new AddColor();
    this.addUserColorUseCase = new AddUserColor();
    this.getUserColorUseCase = new GetUserColor();
    this.getWebsiteColorUseCase = new GetWebsiteColor();
    this.addWebsiteColorUseCase = new AddWebsiteColor();
    this.deleteUserColorUseCase = new DeleteUserColor();
    this.deleteWebsiteColorUseCase = new DeleteWebsiteColor();
  }
  async addColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddColorRequest = {
        id: req.user.id,
        value: req.body.value,
      };

      const color = await this.addColorUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(201).json({ message: "Цвет успешно добавлен.", color: color });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при добавление цвета." });
    }
  }

  async addUserColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddColorRequest = {
        id: req.user.id,
        value: req.body.value,
      };

      await this.addUserColorUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res
        .status(201)
        .json({ message: "Цвет успешно добавлен для пользователя." });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Произошла ошибка при добавление цвета для пользователя.",
      });
    }
  }

  async getUserColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const colors = await this.getUserColorUseCase.execute(
        req.user.id,
        errors
      );

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ colors: colors });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Произошла ошибка при получении цвета пользователя.",
      });
    }
  }

  async deleteUserColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      console.log(req.params.value);
      await this.deleteUserColorUseCase.execute(
        req.user.id,
        req.params.value,
        errors
      );

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res
        .status(200)
        .json({ message: "Цвет успешно удален для пользователя." });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Произошла ошибка при удалении цвета пользователя.",
      });
    }
  }

  async addWebsiteColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddWebsiteColorRequest = {
        id: req.body.websiteId,
        userId: req.user.id,
        value: req.body.value,
      };

      await this.addWebsiteColorUseCase.execute(request, errors);

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(201).json({ message: "Цвет успешно добавлен для вебсайта." });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Произошла ошибка при добавление цвета для вебсайта.",
      });
    }
  }

  async getWebsiteColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const colors = await this.getWebsiteColorUseCase.execute(
        req.user.id,
        req.params.websiteId,
        errors
      );

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ colors: colors });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Произошла ошибка при получении цвета вебсайта.",
      });
    }
  }

  async deleteWebsiteColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      await this.deleteWebsiteColorUseCase.execute(
        req.user.id,
        req.params.websiteId,
        req.params.value,
        errors
      );

      if (errors.length > 0) {
        res.status(errors[0].code).json({ message: errors[0].details });
        return;
      }

      res.status(200).json({ message: "Цвет успешно удален у вебсайта." });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Произошла ошибка при удалении цвета вебсайта.",
      });
    }
  }
}

export default new ColorController();
