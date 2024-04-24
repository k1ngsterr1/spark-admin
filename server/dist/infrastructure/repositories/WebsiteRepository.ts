import {
  IWebsiteRepository,
  NewWebsiteInput,
} from "@core/interfaces/IWebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";

import cheerio from "cheerio";
import axios from 'axios'

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

   async fetchHTMLContent(url: string): Promise<any> {
    try {
      const response = await axios.get(url)
      const $ = cheerio.load(response.data)

      return response.data
    } catch (error) {
      console.error('There was an error with fetching website:', error)
    }
    
  }
}
