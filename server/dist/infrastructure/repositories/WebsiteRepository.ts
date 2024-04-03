import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";
import { json } from "sequelize";
import { NewWebsiteInput } from "@core/utils/types";
import { Page } from "@infrastructure/models/pageModel";
import { User } from "@infrastructure/models/userModel";

export class WebsiteRepository implements IWebsiteRepository {
  async create(websiteDetails: NewWebsiteInput): Promise<Website> {
    return await sequelize.getRepository(Website).create(websiteDetails);
  }

  async findByPk(primaryKey: string | number): Promise<Website | null> {
    return await sequelize.getRepository(Website).findByPk(primaryKey);
  }

  async findByOwner(ownerId: number): Promise<Website[]> {
    return await sequelize.getRepository(Website).findAll({
      where: { owner: ownerId },
      include: [
        {
          model: Page,
        },
        {
          model: User,
        }
      ]
    });
  }

  async findWebsiteByName(ownerId: number, name: string): Promise<Website | null> {
    return sequelize.getRepository(Website).findOne({
      where: { 
        owner: ownerId,
        name: name
      },
    });
  }
}
