import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";

export class CheckWebsite {
  constructor(private websiteRepository: IWebsiteRepository) {}

  async execute(url: string) {
    const websites = await this.websiteRepository.fetchHTMLContent(url);

    // const isVerified = ?
  }
}
