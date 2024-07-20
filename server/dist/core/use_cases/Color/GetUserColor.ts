import { IColorRepository } from "@core/interfaces/IColorRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Color } from "@infrastructure/models/colorModel";
import { ColorRepository } from "@infrastructure/repositories/ColorRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class GetUserColor {
  private userRepository: IUserRepository;
  private colorRepository: IColorRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.colorRepository = new ColorRepository();
  }
  async execute(userId: number, errors: ErrorDetails[]): Promise<Color[]> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      errors.push(new ErrorDetails(404, "User not found"));
      return [];
    }
    const colors = await this.userRepository.findUserColors(userId, errors);

    return colors;
  }
}
