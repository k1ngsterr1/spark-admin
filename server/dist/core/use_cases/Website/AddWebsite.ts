import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { NewWebsiteInput } from "@core/utils/types";
import { validEmail, validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";

export class AddWebsite {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }
  async execute(request: AddWebsiteRequest, errors: ErrorDetails[]): Promise<Website> {
    const {name, url, email} = request;
    const isValidUrl = await validURL(url);
    const isValidEmail =  validEmail(email);
    if(!isValidUrl){
      errors.push(new ErrorDetails(400, "Invalid URL"));
      return;
    }
    if(!isValidEmail){
      errors.push(new ErrorDetails(400, "Invalid Email"));
      return;
    }

    const user = await this.userRepository.findByEmail(email);

    if(user == null){
      errors.push(new ErrorDetails(404, "User not found"));
      return;
    }
    const newWebsiteDetails: NewWebsiteInput = {
      name: name,
      url: url,
      owner: user.id
    };

    const newWebsite = await this.websiteRepository.create(newWebsiteDetails, errors);

    user.websiteId = newWebsite.id;
    await user.save();
    
    return newWebsite;
  }
}
