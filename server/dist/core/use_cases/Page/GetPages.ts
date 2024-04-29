import { Page } from "@infrastructure/models/pageModel";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { ErrorDetails } from "@core/utils/utils";

export class GetPages {
  private pageRepository: IPageRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.pageRepository = new PageRepository();
    this.userRepository = new UserRepository();
  }

  async execute(websiteId: string, userId: number, errors: ErrorDetails[]): Promise<Page[]> {
    const pages = await this.pageRepository.findByWebsiteId(websiteId);
    if(pages === null){
      errors.push(new ErrorDetails(404, "Не найдено ни одной страницы"));
      return;
    }
    const user = await this.userRepository.getUserFromWebsite(websiteId, userId);
    if(user === null){
      errors.push(new ErrorDetails(404, "Не удалось найти пользователя"));
      return;
    }
    return pages;
  }
}
