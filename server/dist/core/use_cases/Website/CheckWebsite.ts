import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";

export class CheckWebsite {
  constructor(private websiteRepository: IWebsiteRepository) {}

  async execute(url: string) {
    const websiteContent = await this.websiteRepository.fetchHTMLContent(url);
    const verifiedContent = await this.websiteRepository.metaTagChecker(
      websiteContent
    );
  }
}
