import {
  IWebsiteRepository,
  NewWebsiteInput,
} from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";

export class WebsiteRepository implements IWebsiteRepository {
  async create(websiteDetails: NewWebsiteInput): Promise<Website> {
    return sequelize.getRepository(Website).create(websiteDetails);
  }

  async findByPk(primaryKey: string | number): Promise<Website | null> {
    return sequelize.getRepository(Website).findByPk(primaryKey);
  }

  async findByOwner(ownerId: number): Promise<Website[]> {
    return sequelize.getRepository(Website).findAll({
      where: { owner: ownerId },
    });
  }
}
