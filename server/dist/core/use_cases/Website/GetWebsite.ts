import { IWebsiteRepository } from "@core/interfaces/IWebsiteReposity";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";

export class GetWebsite {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(ownerId: number, name: string) {
    const website = await this.websiteRepository.findWebsiteByName(ownerId, name);

    return website;
  }
}
