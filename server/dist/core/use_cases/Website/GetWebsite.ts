import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";

export class GetWebsite {
  constructor(private websiteRepository: WebsiteRepository) {}

  async execute(ownerId: number, name: string) {
    const website = await this.websiteRepository.findWebsiteByName(ownerId, name);

    return website;
  }
}
