import { IUserRepository } from "@core/interfaces/IUserRepository";
import { User } from "infrastructure/models/userModel";

export class ChangeUserRoleService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userID,
    newRole,
  }: {
    userID: string;
    newRole: string;
  }): Promise<User> {
    const user = await this.userRepository.findByPk(userID);

    if (!userID || !user) {
      throw new Error("Пользователь не найден");
    }

    user.role = newRole;

    await user.save();

    return;
  }
}
