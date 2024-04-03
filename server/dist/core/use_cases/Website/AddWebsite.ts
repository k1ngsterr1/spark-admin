import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { NewWebsiteInput } from "@core/utils/types";
import { validEmail, validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { AddWebsiteRequest } from "@core/utils/Website/Request";

export class AddWebsite {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(request: AddWebsiteRequest): Promise<Website> {
    const {name, url, email} = request;
    await validURL(url);
    await validEmail(email);

    const user = await this.userRepository.findByEmail(email);

    if(user == null){
      throw new Error("User not found");
    }
    const newWebsiteDetails: NewWebsiteInput = {
      name: name,
      url: url,
      owner: user.id
    };

    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);

    user.websiteId = newWebsite.id;
    await user.save();
    
    return newWebsite;
  }
}
