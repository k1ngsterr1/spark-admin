import { IUserRepository } from "@core/interfaces/IUserRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class CheckAdminRole {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(userId: number): Promise<boolean> {
    const user = await this.userRepository.findByPk(userId);

    console.log("user is here:", user.role);

    const userRole = user.role;

    if (userRole === "sparkAdmin") {
      return true;
    } else {
      return false;
    }
  }
}
