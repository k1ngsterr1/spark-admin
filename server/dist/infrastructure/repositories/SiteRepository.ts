import { ISiteRepository } from "@core/interfaces/ISiteRepository";
import { NewSiteDataInput } from "@core/utils/types";
import { SiteData } from "@infrastructure/models/siteDataModel";
import sequelize from "infrastructure/config/sequelize";

export class SiteRepository implements ISiteRepository {
  async create(siteData: NewSiteDataInput): Promise<SiteData> {
    return await sequelize.getRepository(SiteData).create(siteData);
  }

  async findById(id: number): Promise<SiteData> {
    return await sequelize.getRepository(SiteData).findOne({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string): Promise<any> {
    const siteDatas = await sequelize.getRepository(SiteData).findAll({
      where: {
        name: name,
      },
    });

    const content = siteDatas.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    return content;
  }
}
