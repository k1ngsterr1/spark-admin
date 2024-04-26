import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
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
    const user = await this.userRepository.getUserFromWebsite(websiteId, userId);
    if(user === null){
        throw new Error("User not found");
    }
    const isValidUrl = await validURL(url);
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.delete);
    if(!isValidUrl){
      throw new Error("Invalid URL");
    }
    if(!isValidUser){
      throw new Error("Not enough rights");
    }

    await this.pageRepository.deletePageByUrl(websiteId, url);
  }
}
