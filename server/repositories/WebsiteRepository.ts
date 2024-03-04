import { IWebsiteRepository, NewWebsiteInput } from "@interfaces/IWebsiteReposity";
import { Website } from "@models/websiteModel";
import sequelize from 'config/sequelize';

export class WebsiteRepository implements IWebsiteRepository {
    async create(websiteDetails: NewWebsiteInput): Promise<Website> {
        return sequelize.getRepository(Website).create(websiteDetails);
      }

    async findByPk(primaryKey: string | number): Promise<Website | null> {
        return sequelize.getRepository(Website).findByPk(primaryKey)
    }

    async findByOwner(ownerId: number): Promise<Website[]> {
        return sequelize.getRepository(Website).findAll({
          where: { owner: ownerId },
        });
      }
}