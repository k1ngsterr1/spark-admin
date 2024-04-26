import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { NewPageRequest } from "@core/utils/Page/Request";
import { NewPageInput, WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
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
  async execute(request: NewPageRequest, errors: ErrorDetails[]): Promise<void> {
    const { websiteId, userId, url, name, type } = request;
    const isValidUrl = await validURL(url);
    if(!isValidUrl) {
      errors.push(new ErrorDetails(400, "Invalid URL"));
      return;
    }

    const website = await this.websiteRepository.findByPk(websiteId, errors);
    const user = await this.userRepository.getUserFromWebsite(websiteId, userId);

    if(website === null){
      errors.push(new ErrorDetails(404, "Website not found"));
      return;
    }
    if(user === null){
      errors.push(new ErrorDetails(404, "User not found"));
      return;
    }
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);
    if(!isValidUser){
      errors.push(new ErrorDetails(400, "Invalid User"));
      return;
    }

    const newPage: NewPageInput = {
      websiteId: websiteId,
      url: url,
      name: name,
      type: type
    }

    await this.pageRepository.create(newPage);
  }
}
