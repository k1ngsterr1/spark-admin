import { IUserRepository } from "@core/interfaces/IUserRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Color } from "@infrastructure/models/colorModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class GetWebsiteColor {
  private websiteRepository: IWebsiteRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(
    userId: number,
    websiteId: string,
    errors: ErrorDetails[]
  ): Promise<Color[]> {
    const website = await this.websiteRepository.findByPk(websiteId, errors);
    const user = await this.userRepository.getUserFromWebsite(
      websiteId,
      userId
    );
    if (!website) {
      errors.push(new ErrorDetails(404, "Website not found"));
      return [];
    }
    if (!user) {
      errors.push(new ErrorDetails(403, "Not enough rights."));
      return [];
    }
    console.log("works");
    const colors = await this.websiteRepository.findWebsiteColors(
      websiteId,
      errors
    );

    return colors;
  }
}
