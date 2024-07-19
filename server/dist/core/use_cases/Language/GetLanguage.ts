import { ILanguageRepository } from "@core/interfaces/ILanguageRepository";
import { ErrorDetails } from "@core/utils/utils";
import { LanguageRepository } from "@infrastructure/repositories/LanguageRepository";

export class GetLanguage {
  private languageRepository: ILanguageRepository;
  constructor() {
    this.languageRepository = new LanguageRepository();
  }

  async execute(errors: ErrorDetails[]): Promise<any> {
    const language = await this.languageRepository.getLanguage(errors);

    if (!language) {
      errors.push(new ErrorDetails(404, "Не удалось найти язык."));
      return;
    }
  }
}
