import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";

export class GetWebsites {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(ownerId: number, errors: ErrorDetails[]): Promise<Website[]> {
    const websites = await this.websiteRepository.findByOwner(ownerId, errors);

    if (websites === null) {
      errors.push(
        new ErrorDetails(404, "У этого пользователя нету вебсайтов.")
      );
      return;
    }

    return websites;
  }
}
