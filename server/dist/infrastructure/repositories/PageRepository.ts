import { IPageRepository } from "@core/interfaces/IPageRepository";
import { NewPageInput } from "@core/utils/types";
import { Page } from "infrastructure/models/pageModel";
import sequelize from "infrastructure/config/sequelize";
import { Component } from "@infrastructure/models/componentModel";
import { Block } from "@infrastructure/models/blockModel";
import { SiteData } from "@infrastructure/models/siteDataModel";

export class PageRepository implements IPageRepository {
  // Создание страницы для вебсайта
  async create(pageDetails: NewPageInput): Promise<Page> {
    return await sequelize.getRepository(Page).create(pageDetails);
  }

  // Найти страницу по веб-сайт ID
  async findByWebsiteId(websiteId: string): Promise<Page[]> {
    return await sequelize.getRepository(Page).findAll({
      where: { websiteId: websiteId },
    });
  }

  // Найти страницу по ID страницы
  async findByPageId(pageId: string): Promise<Page> {
    return await sequelize.getRepository(Page).findOne({
      where: { id: pageId },
    });
  }

  // Найти страницу по имени
  async findByWebsiteName(websiteName: string): Promise<Page[]> {
    return await sequelize.getRepository(Page).findAll({
      where: { name: websiteName },
    });
  }

  // Найти страницу по URL
  async findByUrl(url: string): Promise<Page | null> {
    return await sequelize.getRepository(Page).findOne({
      where: { url: url },
      include: [
        {
          model: sequelize.getRepository(SiteData),
          attributes: ["id", "name", "value"],
        }
      ],
      order: [
        [{ model: SiteData, as: 'siteData' }, 'name', 'ASC'],
      ],
    });
  }

  // Удаление страницы
  async deletePageByUrl(websiteId: string, url: string): Promise<void> {
    await sequelize.getRepository(Page).destroy({
      where: {
        websiteId: websiteId,
        url: url,
      },
    });
  }
}
