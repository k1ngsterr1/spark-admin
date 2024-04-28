import { IUserRepository } from "core/interfaces/IUserRepository";
import { User } from "infrastructure/models/userModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { VerifyRequest } from "@core/utils/User/Request";

export class VerifyService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(request: VerifyRequest): Promise<User> {
    const { id, code } = request;
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
