import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import WebsiteService from "@services/websiteService";

// Проверка поля веб-сайта isVerified
export class CheckVerification {
  private websiteRepository: IWebsiteRepository;

  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(
    ownerId: number,
    url: string,
    errors: ErrorDetails[]
  ): Promise<boolean> {
    const website = await this.websiteRepository.findByUrl(
      ownerId,
      url,
      errors
    );
    const isVerified = website.isVerified;

    console.log("isVerified:", isVerified);

    if (isVerified !== false || true) {
      return false;
    } else {
      return true;
    }
  }
}
