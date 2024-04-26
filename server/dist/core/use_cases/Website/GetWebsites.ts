import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";

export class GetWebsites {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(ownerId: number): Promise<Website[]> {
    const websites = await this.websiteRepository.findByOwner(ownerId);

    if (websites === null) {
      throw new Error("Веб-сайты не найдены!");
    }

    return websites;
  }
}
