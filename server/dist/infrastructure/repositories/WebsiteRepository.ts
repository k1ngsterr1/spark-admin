import {
  IWebsiteRepository,
  NewWebsiteInput,
} from "@core/interfaces/IWebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";
import sequelize from "infrastructure/config/sequelize";

import cheerio from "cheerio";
import axios from "axios";

export class WebsiteRepository implements IWebsiteRepository {
  // Создание веб-сайта
  async create(websiteDetails: NewWebsiteInput): Promise<Website> {
    return sequelize.getRepository(Website).create(websiteDetails);
  }

  // Поиска по id
  async findByPk(primaryKey: string | number): Promise<Website | null> {
    return sequelize.getRepository(Website).findByPk(primaryKey);
  }

  // Поиск по id овнера
  async findByOwner(ownerId: number): Promise<Website[]> {
    return sequelize.getRepository(Website).findAll({
      where: { owner: ownerId },
    });
  }

  // Поиск сайта по url
  async findByUrl(urlString: string): Promise<Website> {
    try {
      return await sequelize
        .getRepository(Website)
        .findOne({ where: { url: urlString } });
    } catch (error) {
      console.error("Невозможно найти веб-сайт URL:", error);
      throw error;
    }
  }
}
