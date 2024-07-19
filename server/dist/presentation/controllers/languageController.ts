import { Page } from "./../../infrastructure/models/pageModel";
import { ChangeLanguage } from "@core/use_cases/Language/ChangeLanguage";
import { GetLanguage } from "@core/use_cases/Language/GetLanguage";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class LanguageController {
  private changeLanguageUseCase: ChangeLanguage;
  private getLanguageUseCase: GetLanguage;

  constructor() {
    this.changeLanguageUseCase = new ChangeLanguage();
    this.getLanguageUseCase = new GetLanguage();
  }

  async changeLanguage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const language: "RU" | "EN" = req.body.language;
      const updatedLanguage = await this.changeLanguageUseCase.execute(
        language,
        errors
      );

      res
        .status(201)
        .json({ message: "Язык успешно обновлён", language: updatedLanguage });
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: `Ошибка при изменении языка` });
    }
  }

  async getLanguage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const language = await this.getLanguageUseCase.execute(errors);
      res
        .status(201)
        .json({ message: "Язык успешно получен:", language: language });
    } catch (error: any | unknown) {
      console.error(error);
      res
        .status(500)
        .json({ message: `Ошибка при измении языка`, error: error.message });
    }
  }
}

export default new LanguageController();
