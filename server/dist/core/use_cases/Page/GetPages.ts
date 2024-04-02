import { Page } from "@infrastructure/models/pageModel";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";

export class GetWebsite {
  constructor(private websiteRepository: WebsiteRepository) {}

  async execute(websiteId: string): Promise<Page[]> {
    const pages = await this.pageRepository.findByWebsiteId(websiteId);
    return pages;
  }
}
