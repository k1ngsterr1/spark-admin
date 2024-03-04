import { WebsiteRepository } from './../../repositories/WebsiteRepository';
import { IWebsiteRepository } from '@interfaces/IWebsiteReposity';
import { Website } from "@models/websiteModel";

export class GetWebsite{
    constructor(private websiteRepository: IWebsiteRepository){}

    async execute(ownerId: number){
        const websites = await this.websiteRepository.findByOwner(ownerId);

        return websites.map(website=> ({
            name: website.name,
            url: website.url,
            owner: website.owner,
            users: website.users,
            id: website.id
        }))

    }

}