import { IPageRepository } from "@core/interfaces/IPageRepository";
import { NewPageInput } from "@core/utils/types";
import { Page } from "infrastructure/models/pageModel";
import sequelize from "infrastructure/config/sequelize";

export class PageRepository implements IPageRepository {
    async create(pageDetails: NewPageInput): Promise<Page>{
        return sequelize.getRepository(Page).create(pageDetails);
    }
    async findByWebsiteId(websiteId: string): Promise<Page[]>{
        return sequelize.getRepository(Page).findAll({
            where: { websiteId: websiteId}
        })
    }
}
