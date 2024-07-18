import { IThemeRepository } from "@core/interfaces/IThemeRepository";
import { ErrorDetails } from "@core/utils/utils";
import { ThemeRepository } from "@infrastructure/repositories/ThemeRepository";

export class GetTheme {
  private themeRepository: IThemeRepository;
  constructor() {
    this.themeRepository = new ThemeRepository();
  }

  async execute(errors: ErrorDetails[]): Promise<any> {
    const theme = await this.themeRepository.getTheme(errors);

    if (!theme) {
      errors.push(new ErrorDetails(404, "Не удалось найти тему."));
      return;
    }

    return theme;
  }
}
