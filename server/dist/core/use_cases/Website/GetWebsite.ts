import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";

export class GetWebsite {
  private websiteRepository: WebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(ownerId: number, name: string) {
    const website = await this.websiteRepository.findWebsiteByName(ownerId, name);

    return website;
  }
}
