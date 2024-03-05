import { IWebsiteRepository } from "@interfaces/IWebsiteReposity";

export class AddUser {
  constructor(private websiteRepository: IWebsiteRepository) {}

  async execute({
    email,
    role,
    websiteId,
    requesterID,
  }: {
    email: string;
    role: string;
    websiteId: string;
    requesterID: number;
  }): Promise<void> {
    if (!email || !role || !websiteId) {
      throw new Error("Заполните необходимые поля!");
    }

    const website = await this.websiteRepository.findByPk(websiteId);

    if (!website) {
      throw new Error("Website not found");
    }

    if (website.owner !== requesterID) {
      throw new Error("You are not the owner of this website");
    }

    await this.websiteRepository.addUserToWebsite(websiteId, {
      email,
      role,
    });
  }
}
