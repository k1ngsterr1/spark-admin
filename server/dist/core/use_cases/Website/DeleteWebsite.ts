import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { Website } from "@infrastructure/models/websiteModel";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { validWebsiteUser } from "@core/utils/validators";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";

export class DeleteWebsite {
  private websiteRepository: IWebsiteRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.userRepository = new UserRepository();
  }

  async execute(ownerId: number, url: string, errors: ErrorDetails[]): Promise<Website> {
    const website = await this.websiteRepository.findByUrl(ownerId, url, errors);
    const user = await this.userRepository.getUserFromWebsite(website.id, ownerId);
    if(website === null){
      errors.push(new ErrorDetails(404, "Вебсайта с таким URL не существует"));
      return;
    }
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.delete);
    if(!isValidUser){
      errors.push(new ErrorDetails(403, "У вас недостаточно прав."));
      return;
    }

    await website.destroy();

    return website;
  }
}
