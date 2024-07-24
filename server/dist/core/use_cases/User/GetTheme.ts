import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class GetTheme {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userId: number, errors: ErrorDetails[]): Promise<any> {
    const theme = await this.userRepository.getTheme(userId, errors);

    console.log("theme is here:", theme);

    if (!theme) {
      errors.push(new ErrorDetails(404, "Не удалось найти тему."));
      return;
    }

    return theme;
  }
}
