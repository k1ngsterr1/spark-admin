import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";

export class GetWebsite {
  constructor(private websiteRepository: IWebsiteRepository) {}

  async execute(ownerId: number, name: string) {
    const website = await this.websiteRepository.findWebsiteByName(ownerId, name);

    return website;
  }
}
