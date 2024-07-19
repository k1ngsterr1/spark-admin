import { ILanguageRepository } from "@core/interfaces/ILanguageRepository";
import { Language } from "@infrastructure/models/languageModel";
import sequelize from "@infrastructure/config/sequelize";
import { ErrorDetails } from "@core/utils/utils";

export class LanguageRepository implements ILanguageRepository {
  // Изменение языка
  async change(
    language: "RU" | "EN" | string
  ): Promise<Language | null | string> {
    try {
      const languageInstance = await sequelize
        .getRepository(Language)
        .findByPk(1);

      if (!languageInstance) {
        const newLanguage = await sequelize
          .getRepository(Language)
          .create({ id: 1, language });
        return newLanguage;
      }

      languageInstance.language = language;
      await languageInstance.save();

      return languageInstance;
    } catch (error: any | unknown) {
      console.error("An error occurred while updating the language:", error);
      return null;
    }
  }

  //   Получение языка
  async getLanguage(errors: ErrorDetails[]): Promise<string | Language> {
    return await sequelize.getRepository(Language).findByPk(1);
  }
}
