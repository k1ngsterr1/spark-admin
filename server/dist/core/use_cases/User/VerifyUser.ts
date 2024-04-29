import { IUserRepository } from "core/interfaces/IUserRepository";
import { User } from "infrastructure/models/userModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { VerifyRequest } from "@core/utils/User/Request";
import { ErrorDetails } from "@core/utils/utils";

export class VerifyService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(request: VerifyRequest, errors: ErrorDetails[]): Promise<User> {
    const { id, code } = request;
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      errors.push(new ErrorDetails(404, "Пользователь не найден."));
      return;
    }

    if (!code || !id) {
      errors.push(new ErrorDetails(400, "Неверный код или ID."));
      return;
    }

    if (code !== user.verificationCode) {
      errors.push(new ErrorDetails(400, "Неверный код"));
      return;
    }

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null;
      user.save();
    }

    return;
  }
}
