import { ErrorDetails } from "@core/utils/utils";
import { Language } from "@infrastructure/models/languageModel";

export interface ILanguageRepository {
  change(
    language: "RU" | "ENG" | string,
    errors: ErrorDetails[]
  ): Promise<Language | null | string>;
  getLanguage(errors: ErrorDetails[]): Promise<string | Language>;
}
