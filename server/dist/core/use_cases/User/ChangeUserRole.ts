import { ChangeRoleRequest } from "@core/utils/User/Request";
import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { IUserRepository } from "core/interfaces/IUserRepository";
import { User } from "infrastructure/models/userModel";

export class ChangeUserRoleService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(request: ChangeRoleRequest, errors: ErrorDetails[]): Promise<User> {
    const { userId, newRole } = request;
    const user = await this.userRepository.findByPk(userId);

    if (!userId || !user) {
      errors.push(new ErrorDetails(404, "Пользователь не найден"));
      return;
    }
    if(user.isSparkAdmin !== true){
      errors.push(new ErrorDetails(403, "У вас нет таких полномочий"));
      return;
    }

    user.role = newRole;

    await user.save();

    return user;
  }
}
