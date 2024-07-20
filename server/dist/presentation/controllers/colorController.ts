import { AddColor } from "@core/use_cases/Color/AddColor";
import { AddUserColor } from "@core/use_cases/Color/AddUserColor";
import { DeleteUserColor } from "@core/use_cases/Color/DeleteUserColor";
import { GetUserColor } from "@core/use_cases/Color/GetUserColor";
import { AddColorRequest } from "@core/utils/Color/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class ArticleController {
  private addColorUseCase: AddColor;
  private addUserColorUseCase: AddUserColor;
  private getUserColorUseCase: GetUserColor;
  private deleteUserColorUseCase: DeleteUserColor;
  constructor() {
    this.addColorUseCase = new AddColor();
    this.addUserColorUseCase = new AddUserColor();
    this.getUserColorUseCase = new GetUserColor();
    this.deleteUserColorUseCase = new DeleteUserColor();
  }
  async addColor(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddColorRequest = {
        userId: req.user.id,
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
        userId: req.user.id,
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
}

export default new ArticleController();
