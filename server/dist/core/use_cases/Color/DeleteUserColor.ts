import { IColorRepository } from "@core/interfaces/IColorRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { validColor } from "@core/utils/validators";
import { ColorRepository } from "@infrastructure/repositories/ColorRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class DeleteUserColor {
  private userRepository: IUserRepository;
  private colorRepository: IColorRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.colorRepository = new ColorRepository();
  }
  async execute(
    userId: number,
    value: string,
    errors: ErrorDetails[]
  ): Promise<void> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      errors.push(new ErrorDetails(404, "User not found"));
      return;
    }
    if (!user.isVerified) {
      errors.push(new ErrorDetails(403, "User is not verified"));
      return;
    }
    const isValidColor = await validColor(value);
    if (!isValidColor) {
      errors.push(new ErrorDetails(400, "Invalid color"));
      return;
    }
    const color = await this.colorRepository.findByColor(value, errors);
    if (!color) {
      errors.push(new ErrorDetails(404, "Color not found"));
      return;
    }
    const relationship = await this.colorRepository.findUserToColor(
      userId,
      color.id,
      errors
    );
    if (!relationship) {
      errors.push(new ErrorDetails(400, "User doesn't have this color"));
      return;
    }
    await relationship.destroy();
  }
}
