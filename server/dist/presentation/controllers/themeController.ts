import { ChangeTheme } from "@core/use_cases/Theme/ChangeTheme";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class ThemeController {
  private changeThemeUseCase: ChangeTheme;
  constructor() {
    this.changeThemeUseCase = new ChangeTheme();
  }

  async changeTheme(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const theme: "light" | "dark" = req.body.theme;

      await this.changeThemeUseCase.execute(theme, errors);
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: `Ошибка при измении темы` });
    }
  }
}

export default new ThemeController();
