import { IColorRepository } from "@core/interfaces/IColorRepository";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Color } from "@infrastructure/models/colorModel";
import { User } from "@infrastructure/models/userModel";
import { UserToColor } from "@infrastructure/models/userToColorModel";

export class ColorRepository implements IColorRepository {
  async addColor(value: string, errors: ErrorDetails[]): Promise<Color | null> {
    try {
      const color = await sequelize.getRepository(Color).create({
        value: value,
      });

      return color;
    } catch (error) {
      errors.push(new ErrorDetails(500, "Error adding color"));
    }
  }
  async findByColor(
    value: string,
    errors: ErrorDetails[]
  ): Promise<Color | null> {
    try {
      const color = await sequelize
        .getRepository(Color)
        .findOne({ where: { value: value } });
      return color;
    } catch (error) {
      errors.push(new ErrorDetails(500, "Error finding color"));
    }
  }

  async addUser(
    userId: number,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<UserToColor | null> {
    try {
      const userToColor = await sequelize.getRepository(UserToColor).create({
        userId: userId,
        colorId: colorId,
      });
      return userToColor;
    } catch (error) {
      console.log(error);
      errors.push(new ErrorDetails(500, "Error adding user to color"));
      return null;
    }
  }

  async findUserToColor(
    userId: number,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<UserToColor | null> {
    try {
      const userToColor = await sequelize.getRepository(UserToColor).findOne({
        where: { userId: userId, colorId: colorId },
      });
      return userToColor;
    } catch (error) {
      errors.push(new ErrorDetails(500, "Error finding user to color"));
      return null;
    }
  }
}
