import { NewWebsiteInput } from "@core/interfaces/IWebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";

const websiteCodeGenerator = require("@core/utils/generateWebsiteCode");

// Добавление веб-сайта и генерация специального и уникального кода

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

    const code = websiteCodeGenerator(url);

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
      websiteCode: code,
    };

    const newWebsite = await this.websiteRepository.create(newWebsiteDetails);
    return newWebsite;
  }
}
