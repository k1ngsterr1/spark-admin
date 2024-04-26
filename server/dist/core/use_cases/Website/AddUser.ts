import { AddUserRequest } from "@core/utils/Website/Request";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class AddUser {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(request: AddUserRequest): Promise<void> {
    const { email, role, websiteID, requesterID } = request;
    if (!email || !role || !websiteID) {
      throw new Error("Заполните необходимые поля!");
    }

    const website = await this.websiteRepository.findByPk(websiteID);

    if (!website) {
      throw new Error("Website not found!");
    }

    const isOwner = website.owner === requesterID;
    console.log(isOwner);

    if (!isOwner) {
      throw new Error("You are not the owner of this website");
    }
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.websiteRepository.addUser(websiteID, user.id);
  }
}
