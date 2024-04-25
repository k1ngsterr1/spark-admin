import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepositry";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteReposity";
import { NewPageRequest } from "@core/utils/Page/Request";
import { NewPageInput, WebsiteCommand } from "@core/utils/types";
import { validURL, validWebsiteUser } from "@core/utils/validators";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class AddPage {
  private pageRepository: IPageRepository;
  private userRepository: IUserRepository;
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.pageRepository = new PageRepository();
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(request: NewPageRequest): Promise<void> {
    const { websiteId, userId, url, name, type } = request;
    await validURL(url);

    const website = await this.websiteRepository.findByPk(websiteId);
    const user = await this.userRepository.findByWebsiteId(websiteId, userId);

    if(website === null){
      throw new Error("Website not found");
    }
    if(user === null){
      throw new Error("User not found");
    }
    await validWebsiteUser(user, WebsiteCommand.update);

    const newPage: NewPageInput = {
      websiteId: websiteId,
      url: url,
      name: name,
      type: type
    }

    await this.pageRepository.create(newPage);
  }
}
