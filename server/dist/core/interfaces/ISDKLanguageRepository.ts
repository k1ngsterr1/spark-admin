import { ErrorDetails } from "@core/utils/utils";

export interface ISDKLanguageRepository {
  changeLanguage?(language: "RU" | "EN", errors: ErrorDetails[]): Promise<any>;
}
