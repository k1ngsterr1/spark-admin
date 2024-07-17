import { Theme } from "@infrastructure/models/themeModel";

export interface IThemeRepository {
  changeTheme(theme: "dark" | "light"): Promise<Theme | null | string>;
  getTheme(): Promise<string | Theme[]>;
}
