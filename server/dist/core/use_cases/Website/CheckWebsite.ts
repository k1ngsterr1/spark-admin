import WebsiteService from "@services/websiteService";

// Подгрузка сайта и дальнейшая проверка веб-сайта на наличие нашего тэга

export class CheckWebsite {
  constructor(private websiteService: WebsiteService) {}
  async execute(url: string, expectedCode: string): Promise<boolean> {
    const html = await this.websiteService.fetchHTMLContent(url);
    return this.websiteService.checkMetaTag(html, expectedCode);
  }
}
