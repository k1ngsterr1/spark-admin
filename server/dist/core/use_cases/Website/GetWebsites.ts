import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";

export class GetWebsites {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

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