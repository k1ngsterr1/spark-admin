import { IColorRepository } from "@core/interfaces/IColorRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { AddColorRequest } from "@core/utils/Color/Request";
import { ErrorDetails } from "@core/utils/utils";
import { validColor } from "@core/utils/validators";
import { Color } from "@infrastructure/models/colorModel";
import { ColorRepository } from "@infrastructure/repositories/ColorRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddColor {
  private userRepository: IUserRepository;
  private colorRepository: IColorRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.colorRepository = new ColorRepository();
  }
  async execute(
    request: AddColorRequest,
    errors: ErrorDetails[]
  ): Promise<Color> {
    const userId: number = request.id as number;
    const value: string = request.value;
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      errors.push(new ErrorDetails(404, "User not found"));
      return;
    }
    if (!user.isVerified) {
      errors.push(new ErrorDetails(403, "User not verified"));
      return;
    }
    const existingColor = await this.colorRepository.findByColor(value, errors);

    if (existingColor) {
      errors.push(new ErrorDetails(400, "Color already exists"));
      return;
    }

    const isValidColor = await validColor(value);
    if (!isValidColor) {
      errors.push(new ErrorDetails(400, "Invalid color format"));
      return;
    }

    return await this.colorRepository.addColor(value, errors);
  }
}
