import { IUserRepository } from "core/interfaces/IUserRepositry";
import { User } from "infrastructure/models/userModel";
import { UserVerification } from "@core/utils/types";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class VerifyService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({
    id,
    code
  }: {
    id: number,
    code: string
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
