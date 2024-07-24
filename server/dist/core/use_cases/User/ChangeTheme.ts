import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class ChangeTheme {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(
    userId: number,
    choosenTheme: "light" | "dark",
    errors: ErrorDetails[]
  ): Promise<any> {
    const theme = await this.userRepository.changeTheme(
      userId,
      choosenTheme,
      errors
    );

    console.log("theme in use case:", theme);

    if (!theme) {
      errors.push(new ErrorDetails(404, "Не удалось найти тему."));
      return;
    }

    return theme;
  }
}
