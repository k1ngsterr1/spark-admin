import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";

export class GetWebsite {
  constructor(private websiteRepository: IWebsiteRepository) {}

  async execute(ownerId: number) {
    const websites = await this.websiteRepository.findByOwner(ownerId);

    return websites.map((website) => ({
      name: website.name,
      url: website.url,
      owner: website.owner,
      usersCount: website.users.length,
      id: website.id,
    }));
  }
}
