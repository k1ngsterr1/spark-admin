import { validPassword } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { IUserRepository } from "core/interfaces/IUserRepositry";

export class ChangePasswordService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
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
