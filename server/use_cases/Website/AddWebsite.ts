import { IWebsiteRepository, NewWebsiteInput } from "@interfaces/IWebsiteReposity";
import { Website } from "@models/websiteModel";
import { WebsiteRepository } from "repositories/WebsiteRepository";

export class AddWebsite {
  constructor(private websiteRepository: WebsiteRepository) {}

  async execute({
    name,
    url,
    ownerId,
    ownerEmail,
  }: {
    name: string;
    url: string;
    ownerId: number; 
    ownerEmail: string;
  }): Promise<Website> {
    if (!name || !url) {
      throw new Error('Заполните необходимые поля!');
    }

    const newWebsiteDetails: NewWebsiteInput = {
      name,
      url,
      owner: ownerEmail, 
      users: [{
        email: ownerEmail,
        id: ownerId,
        role: 'Owner',
      }], 
    };

    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);
    return newWebsite;
  }
}
