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
  async create(websiteDetails: NewWebsiteInput, errors: ErrorDetails[]): Promise<Website> {
    try{
      const website = await sequelize.getRepository(Website).create(websiteDetails);
      return website;
    }catch(error){
      errors.push(new ErrorDetails(500, error.message));
      return;
    }
  }

  async findByPk(primaryKey: string | number, errors: ErrorDetails[]): Promise<Website | null> {
    try{
      return await sequelize.getRepository(Website).findByPk(
        primaryKey,
        {
          include: [
            {
              model: sequelize.getRepository(Page),
              attributes: [
                "url",
                "name",
                "type"
              ]
            },
            {
              model: sequelize.getRepository(User),
              attributes: [
                "id",
                "username",
                "email",
                "role",
                "isVerified",
              ],
              through: {
                attributes: [
                  'role',
                  'isSparkAdmin'
                ]
              }
            },
          ],
        }
      );
    } catch(error) {
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }

  async findByOwner(ownerId: number): Promise<Website[]> {
    const websites = await sequelize.getRepository(Website).findAll({
      include: [
        {
          model: sequelize.getRepository(User),
          attributes: ['id', 'email', 'username', 'isVerified', 'role'],
          through: {
            where: {
              owner: ownerId,
            },
            attributes: [
              'role',
              'isSparkAdmin'
            ]
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
  
  async addUser(websiteId: string, userId: number, owner?: number, role?: string): Promise<UserToWebsite>{
    return await sequelize.getRepository(UserToWebsite).create({
      websiteId: websiteId,
      userId: userId,
      owner: owner,
      role: role,
    });
  }
}
