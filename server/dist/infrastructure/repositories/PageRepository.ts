import { IPageRepository } from "@core/interfaces/IPageRepository";
import { NewPageInput } from "@core/utils/types";
import { Page } from "infrastructure/models/pageModel";
import sequelize from "infrastructure/config/sequelize";
import { Component } from "@infrastructure/models/componentModel";

export class PageRepository implements IPageRepository {
    async create(pageDetails: NewPageInput): Promise<Page>{
        return await sequelize.getRepository(Page).create(pageDetails);
    }
    async findByWebsiteId(websiteId: string): Promise<Page[]>{
        return await sequelize.getRepository(Page).findAll({
            where: { websiteId: websiteId }
        });
    }

    async findByUrl(url: string): Promise<Page>{
        return await sequelize.getRepository(Page).findOne({
            where: { url: url },
            include: [
                {
                    model: sequelize.getRepository(Component),
                    attributes: [
                        "name",
                        "text",
                        "blockId"
                    ],
                    order: ['name', 'ASC']
                }
            ]
        });
    }

    async deletePageByUrl(websiteId: string, url: string): Promise<void>{
        await sequelize.getRepository(Page).destroy({
            where: {
                websiteId: websiteId,
                url: url
            }
        })
    }
}
