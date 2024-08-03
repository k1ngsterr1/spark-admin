import { Page } from "@infrastructure/models/pageModel";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { validWebsiteUser } from "@core/utils/validators";
import { WebsiteCommand } from "@core/utils/types";

// Получение всех страниц
export class GetPages {
  private userRepository: IUserRepository;
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.userRepository = new UserRepository();
  }

  async execute(
    websiteName: string,
    userId: number,
    errors: ErrorDetails[]
  ): Promise<Page[]> {
    const website = await this.websiteRepository.findByName(
      websiteName,
      errors
    );
    const user = await this.userRepository.getUserFromWebsite(
      website.id,
      userId
    );
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);
    if (!isValidUser) {
      errors.push(new ErrorDetails(403, "У вас недостаточно прав!"));
      return;
    }
    if (website.pages === null) {
      errors.push(new ErrorDetails(404, "Не найдено ни одной страницы"));
      return;
    }
    return website.pages;
  }
}
