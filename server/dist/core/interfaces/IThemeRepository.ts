import { ErrorDetails } from "@core/utils/utils";
import { Theme } from "@infrastructure/models/themeModel";

export interface IThemeRepository {
  changeTheme(
    theme: "dark" | "light",
    errors: ErrorDetails[]
  ): Promise<Theme | null | string>;
  getTheme(errors: ErrorDetails[]): Promise<string | Theme[]>;
}
