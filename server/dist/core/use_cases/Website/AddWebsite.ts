import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { AddWebsiteRequest, NewWebsiteInput } from "@core/utils/types";
import { validURL } from "@core/utils/validators";

export class AddWebsite {
  constructor(
    private websiteRepository: WebsiteRepository,
  ) {}
  async execute(request: AddWebsiteRequest): Promise<Website> {
    const {name, url, id, email} = request;
    await validURL(url);
    const newWebsiteDetails: NewWebsiteInput = {
      name: name,
      url: url,
      owner: id,
      users: [
        {
          email: email,
          id: id,
          role: "Owner",
        },
      ],
    };
    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);
    return newWebsite;
  }
}
