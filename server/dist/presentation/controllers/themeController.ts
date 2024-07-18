import { ChangeTheme } from "@core/use_cases/Theme/ChangeTheme";
import { GetTheme } from "@core/use_cases/Theme/GetTheme";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class ThemeController {
  private changeThemeUseCase: ChangeTheme;
  private getThemeUseCase: GetTheme;
  constructor() {
    this.getThemeUseCase = new GetTheme();
    this.changeThemeUseCase = new ChangeTheme();
  }

  async changeTheme(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const theme: "light" | "dark" = req.body.theme;

      const updatedTheme = await this.changeThemeUseCase.execute(theme, errors);

      res
        .status(201)
        .json({ message: "Тема успешно обновлена", theme: updatedTheme });
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: `Ошибка при измении темы` });
    }
  }

  async getTheme(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const theme = await this.getThemeUseCase.execute(errors);

      res.status(201).json({ message: "Тема успешно получена:", theme: theme });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: `Ошибка при измении темы`, error: error.message });
    }
  }
}

export default new ThemeController();
