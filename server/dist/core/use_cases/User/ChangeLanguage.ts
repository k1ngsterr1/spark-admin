import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class ChangeLanguage {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(
    userId: number,
    choosenLanguage: "RU" | "EN",
    errors: ErrorDetails[]
  ): Promise<any> {
    const language = await this.userRepository.changeLanguage(
      userId,
      choosenLanguage,
      errors
    );

    if (!language) {
      errors.push(new ErrorDetails(404, "Не удалось найти язык."));
      return;
    }

    return language;
  }
}
