import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";
import { json } from "sequelize";
import { NewWebsiteInput } from "@core/utils/types";
import { Page } from "@infrastructure/models/pageModel";
import { User } from "@infrastructure/models/userModel";
import { ErrorDetails } from "@core/utils/utils";
import cheerio from "cheerio";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";

export class WebsiteRepository implements IWebsiteRepository {
  async create(websiteDetails: NewWebsiteInput, errors: ErrorDetails[]): Promise<Website> {
    try{
      const website = await sequelize.getRepository(Website).create(websiteDetails);
      return website;
    }catch(error){
      errors.push(new ErrorDetails(500, error.message));
      return;
    }
  }

  async findByPk(primaryKey: string | number): Promise<Website | null> {
    return await sequelize.getRepository(Website).findByPk(primaryKey);
  }

  async findByOwner(ownerId: number): Promise<Website[]> {
    const websites = await sequelize.getRepository(Website).findAll({
      include: [
        {
          model: sequelize.getRepository(User),
          attributes: ['id', 'email', 'username', 'isVerified'],
          through: {
            where: {
              owner: ownerId,
            }
          }
        },
        {
          model: sequelize.getRepository(Page),
          attributes: ['id', 'url', 'name', 'type']
        }
      ]
    })
    return websites;
  }

  async findByUrl(ownerId: number, url: string): Promise<Website | null> {
    return sequelize.getRepository(Website).findOne({
      where: { 
        owner: ownerId,
        url: url
      },
    });
  }
  
  async addUser(websiteId: string, userId: number, owner?: number): Promise<UserToWebsite>{
    return await sequelize.getRepository(UserToWebsite).create({
      websiteId: websiteId,
      userId: userId,
      owner: owner
    });
  }
}
