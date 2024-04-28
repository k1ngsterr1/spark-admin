import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";

export class GetWebsitesCode {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(
    ownerId: number,
    url: string,
    errors: ErrorDetails[]
  ): Promise<Website[]> {
    if (!ownerId || !url) {
      errors.push(
        new ErrorDetails(400, "Пожалуйста, предоставьте все нужные данные!")
      );
    }

    const websiteCode = await this.websiteRepository.getCodeByUrl(
      ownerId,
      url,
      errors
    );

    if (websiteCode === null) {
      errors.push(
        new ErrorDetails(
          404,
          "Странно, но по какой-то причине у этого веб-сайта отсутствует код верификации."
        )
      );
      return;
    }

    return;
  }
}
