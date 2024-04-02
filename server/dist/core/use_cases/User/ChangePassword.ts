import { ChangePasswordRequest } from "@core/utils/types";
import { validPassword } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { IUserRepository } from "core/interfaces/IUserRepositry";

export class ChangePasswordService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(request: ChangePasswordRequest): Promise<boolean> {
    const { id, oldPassword, newPassword } = request;
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new Error("Пользователь не найден!");
    }

    const passwordMatch = await user.verifyPassword(oldPassword);

    if (!passwordMatch) {
      throw new Error("Старый пароль не совпадает!");
    }

    await validPassword(newPassword);
    
    return await this.userRepository.changePassword(user, newPassword);
  }
}
