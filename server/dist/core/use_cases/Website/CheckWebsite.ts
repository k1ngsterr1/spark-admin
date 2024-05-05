import { ErrorDetails } from "@core/utils/utils";
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
    expectedCode: string,
    errors: ErrorDetails[]
  ): Promise<{ exists: boolean; isValid: boolean }> {
    const website = await this.websiteRepository.findByUrl(
      ownerId,
      url,
      errors
    );

    if (!website) {
      return { exists: false, isValid: false };
    }

    const html = await this.websiteService.fetchHTMLContent(website.url, ownerId, errors);
    const isValid = await this.websiteService.checkMetaTag(html, expectedCode);

    if (isValid) {
      try {
        await this.websiteRepository.updateIsValid(isValid, url);
      } catch (error: any | unknown) {
        errors.push(
          new ErrorDetails(500, "Ошибка с проверкой верификации веб-сайта")
        );
        return { exists: true, isValid: false };
      }
    }

    return { exists: true, isValid };
  }
}
