import { IUserRepository } from "core/interfaces/IUserRepository";
import { User } from "infrastructure/models/userModel";
import { NewUserInput } from "@core/utils/types";
import { Op } from "sequelize"; // Ensure this is imported correctly

import sequelize from "infrastructure/config/sequelize";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { Website } from "@infrastructure/models/websiteModel";
import { Color } from "@infrastructure/models/colorModel";
import { ErrorDetails } from "@core/utils/utils";

export class UserRepository implements IUserRepository {
  // Создать пользователя
  async create(userDetails: NewUserInput): Promise<User> {
    const existingUser = await this.findByEmail(userDetails.email);

    if (existingUser) {
      throw new Error("Аккаунт с такой почтой уже существует!");
    }

    return sequelize.getRepository(User).create(userDetails);
  }

  // Найти по почте
  async findByEmail(email: string): Promise<User | null> {
    return sequelize.getRepository(User).findOne({ where: { email } });
  }

  // Найти по ID
  async findByPk(pk: number): Promise<User | null> {
    return sequelize.getRepository(User).findByPk(pk);
  }

  // Найти одного
  async findOne(options: { where: { email: string } }): Promise<User | null> {
    return sequelize.getRepository(User).findOne(options);
  }

  // Смена пароля
  async changePassword(user: User, newPassword: string): Promise<boolean> {
    user.password = newPassword;
    await user.save();
    return true;
  }

  // Сохранение кода верификации
  async saveVerificationCode(
    user: any,
    verificationCode: string
  ): Promise<void> {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    await this.updateUser(user.id, {
      verificationCode: verificationCode,
      verificationCodeExpires: expirationTime,
    });
  }

  // Проверка кода
  async verifyCode(user, verificationCode: string): Promise<boolean> {
    const currentTime = new Date();

    if (
      user.verificationCode === verificationCode &&
      user.verificationCodeExpires > new Date()
    ) {
      await this.clearVerificationCode(user.id);
      return true;
    } else {
      if (user.verificationCodeExpires <= currentTime) {
        await this.clearVerificationCode(user.id);
      }
      return false;
    }
  }

  // Очистка кода подтверждения
  async clearVerificationCode(userId: number): Promise<any> {
    await this.updateUser(userId, {
      verificationCode: null,
      vericationCodeExpires: null,
    });
  }

  // Очистка кода времени
  async cleanUpExpiredCodes(): Promise<void> {
    const currentTime = new Date();

    await sequelize
      .getRepository(User)
      .update(
        { verificationCode: null, verificationCodeExpires: null } as any,
        { where: { verificationCodeExpires: { [Op.lt]: currentTime } } } as any
      );
  }

  // Обновление филдов юзера
  async updateUser(userId: number, updateFields): Promise<any> {
    try {
      const result = await sequelize.getRepository(User).update(updateFields, {
        where: { id: userId },
      });

      return result;
    } catch (error) {
      console.error("Ошибка с обновлением полей пользователя:", error);
      throw error;
    }
  }

  // Получение пользователя по website id
  async getUserFromWebsite(
    websiteId: string,
    userId: number
  ): Promise<UserToWebsite | null> {
    try {
      const userToWebsite = await sequelize
        .getRepository(UserToWebsite)
        .findOne({
          where: {
            userId: userId,
            websiteId: websiteId,
          },
        });
      return userToWebsite;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // Получение пользователя по коду веб-сайта
  async getUserFromWebsiteWithCode(
    websiteId: string,
    userId: number
  ): Promise<UserToWebsite | null> {
    try {
      const userToWebsite = await sequelize
        .getRepository(UserToWebsite)
        .findOne({
          where: {
            userId: userId,
            websiteId: websiteId,
          },
          include: [
            {
              model: sequelize.getRepository(Website),
              attributes: ["websiteCode"],
            },
          ],
        });
      return userToWebsite;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async findUserColors(
    userId: number,
    errors: ErrorDetails[]
  ): Promise<Color[]> {
    try {
      const user = await sequelize.getRepository(User).findOne({
        where: { id: userId },
        include: [
          {
            model: sequelize.getRepository(Color),
            through: {
              attributes: [],
            },
          },
        ],
      });

      return user.colors;
    } catch (error) {
      console.log(error);
      errors.push(new ErrorDetails(500, "Error finding user colors"));
      return [];
    }
  }

  // Поменять тему пользователя
  async changeTheme(
    userId: number,
    theme: string,
    errors: ErrorDetails[]
  ): Promise<string> {
    try {
      const [numberOfAffectedRows] = await sequelize
        .getRepository(User)
        .update({ theme: theme }, { where: { id: userId } });

      if (numberOfAffectedRows === 0) {
        errors.push(new ErrorDetails(404, "User or language not found"));
        return "EN";
      }

      return theme;
    } catch (error) {
      console.error("Ошибка с обновлением темы:", error);
      errors.push(new ErrorDetails(500, "Ошибка сервера"));
      // return "light";
    }
  }

  // Получить тему пользователя
  async getTheme(userId: number, errors: ErrorDetails[]): Promise<string> {
    try {
      const user = await sequelize.getRepository(User).findByPk(userId);
      const theme = user.theme;

      console.log("theme is repo:", theme);

      if (!theme) {
        errors.push(new ErrorDetails(404, "Тема пользователя не была найден"));
      }

      return theme;
    } catch (error) {
      console.error("Ошибка с получением темы:", error);
      errors.push(new ErrorDetails(500, "Ошибка сервера"));
      return "light";
    }
  }

  // Поменять язык пользователя
  async changeLanguage(
    userId: number,
    language: "RU" | "EN",
    errors: ErrorDetails[]
  ): Promise<string> {
    try {
      const [numberOfAffectedRows] = await sequelize
        .getRepository(User)
        .update({ language: language }, { where: { id: userId } });

      // ! Найдена ошибка
      if (numberOfAffectedRows === 0) {
        errors.push(new ErrorDetails(404, "Язык пользователя не найден"));
        return "EN";
      }

      return language;
    } catch (error) {
      console.error("Ошибка с обновлением языка:", error);
      errors.push(new ErrorDetails(500, "Ошибка сервера"));
    }
  }

  // Получить язык пользователя
  async getLanguage(userId: number, errors: ErrorDetails[]): Promise<string> {
    try {
      const user = await sequelize.getRepository(User).findByPk(userId);
      const language = user.language;

      if (!language) {
        errors.push(new ErrorDetails(404, "Язык пользователя не был найден"));
      }

      return language;
    } catch (error) {
      console.error("Ошибка с получением языка:", error);
      errors.push(new ErrorDetails(500, "Ошибка сервера"));
      return "EN";
    }
  }
}
