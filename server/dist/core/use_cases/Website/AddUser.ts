import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";

// Добавление пользователя в сайт
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
      throw new Error("Веб-сайт не найден");
    }

    if (website.owner !== requesterID) {
      throw new Error("Вы не владелец веб-сайта");
    }

    await this.websiteRepository.addUserToWebsite(websiteId, {
      email,
      role,
    });
  }
}
