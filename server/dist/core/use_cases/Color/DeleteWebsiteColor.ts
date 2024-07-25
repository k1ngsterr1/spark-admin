import { IColorRepository } from "@core/interfaces/IColorRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { AddWebsiteColorRequest } from "@core/utils/Color/Request";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validColor, validWebsiteUser } from "@core/utils/validators";
import { ColorRepository } from "@infrastructure/repositories/ColorRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class DeleteWebsiteColor {
  private websiteRepository: IWebsiteRepository;
  private userRepository: IUserRepository;
  private colorRepository: IColorRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.userRepository = new UserRepository();
    this.colorRepository = new ColorRepository();
  }
  async execute(
    userId: number,
    websiteId: string,
    value: string,
    errors: ErrorDetails[]
  ): Promise<void> {
    const user = await this.userRepository.getUserFromWebsite(
      websiteId,
      userId
    );
    const website = await this.websiteRepository.findByPk(websiteId, errors);
    if (!website) {
      errors.push(new ErrorDetails(404, "Website not found"));
      return;
    }
    if (!website.isVerified) {
      errors.push(new ErrorDetails(403, "Website not verified"));
      return;
    }
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);
    if (!isValidUser) {
      errors.push(new ErrorDetails(403, "You don't have enough rights."));
      return;
    }
    const isValidColor = await validColor(value);
    if (!isValidColor) {
      errors.push(new ErrorDetails(400, "Invalid color format"));
      return;
    }
    const color = await this.colorRepository.findByColor(value, errors);
    if (!color) {
      errors.push(new ErrorDetails(404, "Color not found"));
      return;
    }
    const relationship = await this.colorRepository.findWebsiteToColor(
      websiteId,
      color.id,
      errors
    );
    if (!relationship) {
      errors.push(new ErrorDetails(400, "Website doesn't have this color"));
      return;
    }
    await relationship.destroy();
  }
}
