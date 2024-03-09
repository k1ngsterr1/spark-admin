import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";
import { json } from "sequelize";

export class WebsiteRepository implements IWebsiteRepository {
  async create(websiteDetails): Promise<Website> {
    return await sequelize.getRepository(Website).create(websiteDetails);
  }

  async findByPk(primaryKey: string | number): Promise<Website | null> {
    return await sequelize.getRepository(Website).findByPk(primaryKey);
  }

  async findByOwner(ownerId: number): Promise<Website[]> {
    return await sequelize.getRepository(Website).findAll({
      where: { owner: ownerId },
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
