import WebsiteService from "@services/websiteService";

// Подгрузка сайта и дальнейшая проверка веб-сайта на наличие нашего тэга
export class CheckWebsite {
  constructor(
    private websiteService: WebsiteService,
    private websiteRepository
  ) {}
  async execute(
    ownerId: number,
    url: string,
    expectedCode: string
  ): Promise<{ exists: boolean; isValid: boolean }> {
    const website = await this.websiteRepository.findByUrl(ownerId, url);

    if (!website) {
      return { exists: false, isValid: false };
    }

    const html = await this.websiteService.fetchHTMLContent(website.url);
    const isValid = await this.websiteService.checkMetaTag(html, expectedCode);
    return { exists: true, isValid };
  }
}
