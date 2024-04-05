import { ChangeRoleRequest } from "@core/utils/User/Request";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { IUserRepository } from "core/interfaces/IUserRepositry";
import { User } from "infrastructure/models/userModel";

export class ChangeUserRoleService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(request: ChangeRoleRequest): Promise<User> {
    const { userId, newRole } = request;
    const user = await this.userRepository.findByPk(userId);

    if (!userId || !user) {
      throw new Error("Пользователь не найден");
    }
    if(user.isSparkAdmin !== true){
      throw new Error("У вас нет таких полномочий");
    }

    user.role = newRole;

    await user.save();

    return user;
  }
}
