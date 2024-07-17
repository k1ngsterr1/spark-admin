import { IThemeRepository } from "@core/interfaces/IThemeRepository";
import { ErrorDetails } from "@core/utils/utils";
import { ThemeRepository } from "@infrastructure/repositories/ThemeRepository";

export class ChangeTheme {
  private themeRepository: IThemeRepository;
  constructor() {
    this.themeRepository = new ThemeRepository();
  }

  async execute(
    choosenTheme: "light" | "dark",
    errors: ErrorDetails[]
  ): Promise<any> {
    const theme = await this.themeRepository.changeTheme(choosenTheme);

    return theme;
  }
}
