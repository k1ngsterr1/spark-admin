import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import authenticateToken from "infrastructure/middleware/authMiddleware";
import { NewWebsiteInput } from "@core/utils/types";
import { validURL } from "@core/utils/validators";

export class AddWebsite {
  constructor(
    private websiteRepository: WebsiteRepository,
  ) {}

  async execute({
    name,
    url,
    ownerId,
    ownerEmail
  }: {
    name: string;
    url: string;
    ownerId: number;
    ownerEmail: string;
  }): Promise<Website> {
    if (!name || !url) {
      throw new Error("Заполните необходимые поля!");
    }
    await validURL(url);
    const newWebsiteDetails: NewWebsiteInput = {
      name: name,
      url: url,
      owner: ownerId,
      users: [
        {
          email: ownerEmail,
          id: ownerId,
          role: "Owner",
        },
      ],
    };
    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);
    return newWebsite;
  }
}
