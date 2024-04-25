import WebsiteService from "@services/websiteService";

export class CheckWebsite {
  constructor(private websiteService: WebsiteService) {}
  // Подгрузка сайта и дальнейшая проверка веб-сайта на наличие нашего тэга
  async execute(url: string, expectedCode: string): Promise<boolean> {
    const html = await this.websiteService.fetchHTMLContent(url);

    return this.websiteService.checkMetaTag(html, expectedCode);
  }
}
