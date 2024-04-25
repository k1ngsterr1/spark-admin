import { Page } from "@infrastructure/models/pageModel";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepositry";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class GetPages {
  private pageRepository: IPageRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.pageRepository = new PageRepository();
    this.userRepository = new UserRepository();
  }

  async execute(websiteId: string, userId: number): Promise<Page[]> {
    const pages = await this.pageRepository.findByWebsiteId(websiteId);
    if(pages === null){
      throw new Error("Incorrect website ID");
    }
    const user = await this.userRepository.findByWebsiteId(websiteId, userId);
    if(user === null){
      throw new Error("User not found");
    }
    return pages;
  }
}
