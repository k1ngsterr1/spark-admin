import { ILanguageRepository } from "@core/interfaces/ILanguageRepository";
import { ErrorDetails } from "@core/utils/utils";
import { LanguageRepository } from "@infrastructure/repositories/LanguageRepository";

export class ChangeLanguage {
  private languageRepository: ILanguageRepository;
  constructor() {
    this.languageRepository = new LanguageRepository();
  }

  async execute(
    choosenLanguage: "RU" | "EN",
    errors: ErrorDetails[]
  ): Promise<any> {
    const language = await this.languageRepository.change(
      choosenLanguage,
      errors
    );

    if (!language) {
      errors.push(new ErrorDetails(404, "Не удалось найти язык."));
      return;
    }

    return language;
  }
}
