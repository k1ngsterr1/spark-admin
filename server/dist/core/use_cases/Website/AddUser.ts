import { AddUserRequest } from "@core/utils/Website/Request";
import { UserRole } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class AddUser {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(request: AddUserRequest, errors: ErrorDetails[]): Promise<void> {
    const { email, role, websiteID, requesterID } = request;
    if (!email || !role || !websiteID) {
      errors.push(new ErrorDetails(400, "Введите все поля"));
      return;
    }

    const website = await this.websiteRepository.findByPk(websiteID, errors);

    if (!website) {
      errors.push(new ErrorDetails(404, "Вебсайта с таким ID нету"));
      return;
    }

    const isOwner = website.owner === requesterID;

    if (!isOwner) {
      errors.push(new ErrorDetails(403, "Вы не владелец этого вебсайта"));
      return;
    }
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      errors.push(new ErrorDetails(400, "Пользователя с такой электронной почтой не существует"));
      return;
    }

    await this.websiteRepository.addUser(websiteID, user.id, null, role);
  }
}
