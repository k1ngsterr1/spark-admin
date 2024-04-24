import { IUserRepository } from "@core/interfaces/IUserRepository";

export class ChangePasswordService {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userID: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await this.userRepository.findByPk(userID);

    if (!user) {
      throw new Error("Пользователь не найден!");
    }

    const passwordMatch = await user.verifyPassword(oldPassword);

    if (!passwordMatch) {
      throw new Error("Старый пароль не совпадает!");
    }

    const passwordChanged = await this.userRepository.changePassword(
      userID,
      newPassword
    );
    user.password = newPassword;
    await user.save();
    return;
  }
}
