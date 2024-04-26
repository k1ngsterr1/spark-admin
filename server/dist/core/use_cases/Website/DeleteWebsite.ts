import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { WebsiteRepository } from "../../../infrastructure/repositories/WebsiteRepository";
import { Website } from "@infrastructure/models/websiteModel";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { validWebsiteUser } from "@core/utils/validators";
import { WebsiteCommand } from "@core/utils/types";

export class DeleteWebsite {
  private websiteRepository: IWebsiteRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
    this.userRepository = new UserRepository();
  }

  async execute(ownerId: number, url: string): Promise<Website> {
    const website = await this.websiteRepository.findByUrl(ownerId, url);
    const user = await this.userRepository.getUserFromWebsite(website.id, ownerId);
    if(website === null){
      throw new Error("No website found");
    }
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.delete);
    if(!isValidUser){
      throw new Error("Not enough rights");
    }

    await website.destroy();

    return website;
  }
}
