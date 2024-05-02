import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import WebsiteService from "@services/websiteService";

// Подгрузка сайта и дальнейшая проверка веб-сайта на наличие нашего тэга

export class CheckWebsite {
  constructor(
    private websiteService: WebsiteService,
    private websiteRepository
  ) {}
  async execute(
    url: string,
    expectedCode: string
  ): Promise<{ exists: boolean; isValid: boolean }> {
    console.log("url is here:", url, "website is here:");

    const website = await this.websiteRepository.findByUrl(url);

    if (!website) {
      return { exists: false, isValid: false };
    }

    const html = await this.websiteService.fetchHTMLContent(website.url);
    const isValid = await this.websiteService.checkMetaTag(html, expectedCode);
    return { exists: true, isValid };
  }
}
