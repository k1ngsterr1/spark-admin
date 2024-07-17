import { IThemeRepository } from "@core/interfaces/IThemeRepository";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Theme } from "@infrastructure/models/themeModel";

export class ThemeRepository implements IThemeRepository {
  // Смена темы
  async changeTheme(theme: "dark" | "light"): Promise<Theme> {
    const [numberOfAffectedRows, affectedRows] = await sequelize
      .getRepository(Theme)
      .update({ theme }, { where: { id: 1 }, returning: true });
    return affectedRows[0];
  }
}
