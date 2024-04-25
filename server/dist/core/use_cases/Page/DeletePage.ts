import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepositry";
import { WebsiteCommand } from "@core/utils/types";
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
  async execute(websiteId: string, userId: number, url: string): Promise<void> {
    const user = await this.userRepository.findByWebsiteId(websiteId, userId);
    if(user === null){
        throw new Error("User not found");
    }
    await validURL(url);
    await validWebsiteUser(user, WebsiteCommand.delete);

    await this.pageRepository.deletePageByUrl(websiteId, url);
  }
}
