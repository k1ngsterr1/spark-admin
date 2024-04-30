import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";
import { json } from "sequelize";
import { NewWebsiteInput } from "@core/utils/types";
import { Page } from "@infrastructure/models/pageModel";
import { User } from "@infrastructure/models/userModel";
import { ErrorDetails } from "@core/utils/utils";
import cheerio from "cheerio";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";

export class WebsiteRepository implements IWebsiteRepository {
  // Создать веб-сайт
  async create(
    websiteDetails: NewWebsiteInput,
    errors: ErrorDetails[]
  ): Promise<Website> {
    try {
      const website = await sequelize
        .getRepository(Website)
        .create(websiteDetails);
      return website;
    } catch (error) {
      errors.push(new ErrorDetails(500, error.message));
      return;
    }
  }

  // Найти по ID сайта
  async findByPk(
    primaryKey: string | number,
    errors: ErrorDetails[]
  ): Promise<Website | null> {
    try {
      return await sequelize.getRepository(Website).findByPk(primaryKey, {
        include: [
          {
            model: sequelize.getRepository(Page),
            attributes: ["url", "name", "type"],
          },
          {
            model: sequelize.getRepository(User),
            attributes: ["id", "username", "email", "role", "isVerified"],
            through: {
              attributes: ["role", "isSparkAdmin"],
            },
          },
        ],
      });
    } catch (error) {
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }
  // Найти по ID владельца
  async findByOwner(
    ownerId: number,
    errors: ErrorDetails[]
  ): Promise<Website[]> {
    try {
      const websites = await sequelize.getRepository(Website).findAll({
        where: {
          owner: ownerId,
        },
        include: [
          {
            model: sequelize.getRepository(User),
            attributes: ["id", "email", "username", "isVerified", "role"],
            through: {
              attributes: ["role", "isSparkAdmin"],
            },
          },
          {
            model: sequelize.getRepository(Page),
            attributes: ["id", "url", "name", "type"],
          },
        ],
      });
      return websites;
    } catch (error) {
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }

  // Найти по URL
  async findByUrl(
    ownerId: number,
    url: string,
    errors: ErrorDetails[]
  ): Promise<Website | null> {
    try {
      return sequelize.getRepository(Website).findOne({
        where: {
          owner: ownerId,
          url: url,
        },
      });
    } catch (error) {
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }

  // Добавить пользователя в веб-сайт
  async addUser(
    websiteId: string,
    userId: number,
    owner?: number,
    role?: string,
    errors?: ErrorDetails[]
  ): Promise<UserToWebsite> {
    try {
      return await sequelize.getRepository(UserToWebsite).create({
        websiteId: websiteId,
        userId: userId,
        owner: owner,
        role: role,
      });
    } catch (error) {
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }

  // Найти код по URL веб-сайта
  async getCodeByUrl(
    ownerId: number,
    url: string,
    errors: ErrorDetails[]
  ): Promise<string> {
    try {
      const website = await sequelize.getRepository(Website).findOne({
        where: {
          owner: ownerId,
          url: url,
        },
      });

      console.log(ownerId);
      console.log(url);

      console.log("website code is here:", website.websiteCode);

      if (!website) {
        throw new Error(
          "Веб-сайт не найден, пожалуйста добавьте его в нашу базу данных."
        );
      } else if (website.owner !== ownerId) {
        const errorMsg = "Вы не владелец этого веб-сайта.";
        errors.push(new ErrorDetails(403, errorMsg));
        return null;
      } else {
        return website.websiteCode;
      }
    } catch (error) {
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }

  async findWebsitesUsers(errors: ErrorDetails[]): Promise<Website[]> {
    try {
      const websites = await sequelize.getRepository(Website).findAll({
        attributes: ["id", "owner"],
        include: [
          {
            model: sequelize.getRepository(User),
            attributes: ["username", "email", "isVerified"],
            through: {
              attributes: ["role"],
            },
          },
        ],
      });
      return websites;
    } catch (error) {
      console.log(error);
      errors.push(
        new ErrorDetails(500, "Ошибка при получение вебсайтов с базы данных")
      );
      return [];
    }
  }
}
