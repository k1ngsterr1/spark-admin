import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { AddWebsiteRequest, NewWebsiteInput } from "@core/utils/types";
import { validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddWebsite {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(request: AddWebsiteRequest): Promise<Website> {
    const {name, url, id, email} = request;
    await validURL(url);
    const newWebsiteDetails: NewWebsiteInput = {
      name: name,
      url: url,
      owner: id
    };
    const user = await this.userRepository.findByEmail(email);
    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);

    user.websiteId = newWebsite.id;
    await user.save();
    
    return newWebsite;
  }
}
