import { AddUserRequest } from "@core/utils/types";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class AddUser {
  constructor(
    private websiteRepository: WebsiteRepository,
    private userRepository: UserRepository
  ) {}

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
    const userToAdd = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!userToAdd) {
      throw new Error("User not found");
    }

    const newUserItem = {
      id: userToAdd.id,
      email: email,
      role: role,
    };

    website.users = [...website.users, newUserItem];
    await website.save();
  }
}
