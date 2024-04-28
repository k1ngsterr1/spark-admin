import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { Website } from "@infrastructure/models/websiteModel";
import { ErrorDetails } from "@core/utils/utils";

export class GetWebsite {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(
    ownerId: number,
    url: string,
    errors: ErrorDetails[]
  ): Promise<Website> {
    const website = await this.websiteRepository.findByUrl(
      ownerId,
      url,
      errors
    );

    if (website === null) {
      errors.push(new ErrorDetails(404, "Веб-сайт не найден!"));
    }

    return website;
  }
}
