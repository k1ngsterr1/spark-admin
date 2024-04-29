import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validURL, validWebsiteUser } from "@core/utils/validators";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class DeletePage {
  private pageRepository: IPageRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.pageRepository = new PageRepository();
    this.userRepository = new UserRepository();
  }
  async execute(websiteId: string, userId: number, url: string, errors: ErrorDetails[]): Promise<void> {
    const user = await this.userRepository.getUserFromWebsite(websiteId, userId);
    if(user === null){
        errors.push(new ErrorDetails(404, "Не удалось найти пользователя"));
    }

    const isValidUrl = await validURL(url);
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.delete);
    
    if(!isValidUrl){
      errors.push(new ErrorDetails(400, "Некорректный URL"));
      return;
    }
    if(!isValidUser){
      errors.push(new ErrorDetails(403, "Недостаточно прав"));
      return;
    }

    await this.pageRepository.deletePageByUrl(websiteId, url);
  }
}
