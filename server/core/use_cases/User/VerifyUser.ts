import { IUserRepository } from "core/interfaces/IUserRepositry";
import { User } from "infrastructure/models/userModel";

export class VerifyService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    userCode,
    userID,
  }: {
    userCode: string;
    userID: number;
  }): Promise<User> {
    const user = await this.userRepository.findByPk(userID);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    if (!userCode || !userID) {
      throw new Error("Неверный код или ID");
    }

    if (userCode !== user.verificationCode) {
      throw new Error("Неверный код");
    }

    if ((await user).verificationCode === userCode) {
      (await user).isVerified = true;
      (await user).verificationCode = null;
      (await user).save;
    }

    return;
  }
}
