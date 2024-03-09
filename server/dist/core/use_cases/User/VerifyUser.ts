import { IUserRepository } from "core/interfaces/IUserRepositry";
import { User } from "infrastructure/models/userModel";
import { UserVerification } from "@core/utils/types";

export class VerifyService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
    code
  }: UserVerification {
    id: string,
    code: number
  }): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new Error("Пользователь не найден");
    }

    if (!code || !id) {
      throw new Error("Неверный код или ID");
    }

    if (code !== user.verificationCode) {
      throw new Error("Неверный код");
    }

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null;
      user.save();
    }

    return;
  }
}
