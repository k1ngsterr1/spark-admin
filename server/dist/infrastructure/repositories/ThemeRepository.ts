import { IThemeRepository } from "@core/interfaces/IThemeRepository";
import { Theme } from "@infrastructure/models/themeModel";
import sequelize from "@infrastructure/config/sequelize";

export class ThemeRepository implements IThemeRepository {
  // Смена темы
  async changeTheme(theme: "dark" | "light"): Promise<Theme | null | string> {
    try {
      // Find the Theme by primary key
      const themeInstance = await sequelize.getRepository(Theme).findByPk(1);

      console.log("theme is here:", theme);

      if (!themeInstance) {
        // Optionally create a new theme if not found
        const newTheme = await sequelize
          .getRepository(Theme)
          .create({ id: 1, theme });
        return newTheme;
      }

      // Update the theme
      themeInstance.theme = theme;
      await themeInstance.save(); // Save the changes

      console.log("theme instance is here:", themeInstance.theme);

      return themeInstance; // Return the updated theme
    } catch (error) {
      console.error("An error occurred while updating the theme:", error);
      return null;
    }
  }

  //   Получение темы
  async getTheme(): Promise<string | Theme[]> {
    return await sequelize.getRepository(Theme).findAll();
  }
}
