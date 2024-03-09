import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";

export class GetWebsites {
  constructor(private websiteRepository: IWebsiteRepository) {}

  async execute(ownerId: number) {
    const websites = await this.websiteRepository.findByOwner(ownerId);

    return websites.map((website) => ({
      name: website.name,
      url: website.url,
      owner: website.owner,
      pages: website.pages,
      usersCount: website.users.length,
      id: website.id,
    }));
  }
}
