import { ISiteRepository } from "@core/interfaces/ISiteRepository";
import { NewSiteDataInput } from "@core/utils/types";
import { SiteData } from "@infrastructure/models/siteDataModel";
import sequelize from "infrastructure/config/sequelize";

export class SiteRepository implements ISiteRepository{
    async create(siteData: NewSiteDataInput): Promise<SiteData>{
        return await sequelize.getRepository(SiteData).create(siteData);
    }

    async findById(name: string, id: number): Promise<SiteData>{
        return await sequelize.getRepository(SiteData).findOne({
            where: {
                id: id,
                name: name,
            }
        });
    }
}