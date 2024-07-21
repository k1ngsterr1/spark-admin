import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { IUserRepository } from "core/interfaces/IUserRepository";

export class GetLanguage {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userId: number, errors: ErrorDetails[]): Promise<any> {
    const language = await this.userRepository.getLanguage(userId, errors);

    if (!language) {
      errors.push(new ErrorDetails(404, "Не удалось найти язык."));
      return;
    }

    return language;
  }
}
