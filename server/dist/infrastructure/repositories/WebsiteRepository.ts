import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";
import { json } from "sequelize";
import { NewWebsiteInput } from "@core/utils/types";
import { Page } from "@infrastructure/models/pageModel";
import { User } from "@infrastructure/models/userModel";
import { ErrorDetails } from "@core/utils/utils";

export class WebsiteRepository implements IWebsiteRepository {
  async create(websiteDetails: NewWebsiteInput, errors: ErrorDetails[]): Promise<Website> {
    try{
      const website = await sequelize.getRepository(Website).create(websiteDetails);
      return website;
    }catch(erroe){
      errors.push(new ErrorDetails(500, "Что то пошло не так при создание вебсайта"));
      return;
    }
  }

  async findByPk(primaryKey: string | number): Promise<Website | null> {
    return await sequelize.getRepository(Website).findByPk(primaryKey);
  }

  async findByOwner(ownerId: number): Promise<Website[]> {
    return await sequelize.getRepository(Website).findAll({
      where: { owner: ownerId },
      include: [
        {
          model: sequelize.getRepository(Page),
          attributes: [
            'id', 
            'url', 
            'name', 
            'type'
          ]
        },
        {
          model: sequelize.getRepository(User),
          attributes: [
            'id',
            'username',
            'email',
            'role',
            'isVerified'
          ]
        }
      ]
    });
  }

  async findByUrl(ownerId: number, url: string): Promise<Website | null> {
    return sequelize.getRepository(Website).findOne({
      where: { 
        owner: ownerId,
        url: url
      },
    });
  }
}
