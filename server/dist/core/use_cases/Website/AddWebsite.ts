import { NewWebsiteInput } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";

export class AddWebsite {
  constructor(private websiteRepository: WebsiteRepository) {}

  async execute({
    name,
    url,
    owner,
    ownerEmail,
  }: {
    name: string;
    url: string;
    owner: number;
    ownerEmail: string;
  }): Promise<Website> {
    if (!name || !url) {
      throw new Error("Заполните необходимые поля!");
    }

    const newWebsiteDetails: NewWebsiteInput = {
      name,
      url,
      owner,
      ownerEmail,
      users: [
        {
          email: ownerEmail,
          id: owner,
          role: "Owner",
        },
      ],
    };

    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);
    return newWebsite;
  }
}
