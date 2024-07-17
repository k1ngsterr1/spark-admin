import { Theme } from "@infrastructure/models/themeModel";

export interface IThemeRepository {
  changeTheme(theme: "dark" | "light"): Promise<Theme>;
}
