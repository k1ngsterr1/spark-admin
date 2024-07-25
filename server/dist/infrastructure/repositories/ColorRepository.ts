import { IColorRepository } from "@core/interfaces/IColorRepository";
import { ErrorDetails } from "@core/utils/utils";
import sequelize from "@infrastructure/config/sequelize";
import { Color } from "@infrastructure/models/colorModel";
import { User } from "@infrastructure/models/userModel";
import { UserToColor } from "@infrastructure/models/userToColorModel";
import { WebsiteToColor } from "@infrastructure/models/websiteToColor";

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

  async addWebsite(
    websiteId: string,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<WebsiteToColor | null> {
    try {
      const websiteToColor = await sequelize
        .getRepository(WebsiteToColor)
        .create({
          websiteId: websiteId,
          colorId: colorId,
        });
      return websiteToColor;
    } catch (error) {
      console.log(error);
      errors.push(new ErrorDetails(500, "Error adding website to color"));
      return null;
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

  async findWebsiteToColor(
    websiteId: string,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<WebsiteToColor | null> {
    try {
      const websiteToColor = await sequelize
        .getRepository(WebsiteToColor)
        .findOne({
          where: { websiteId: websiteId, colorId: colorId },
        });
      return websiteToColor;
    } catch (error) {
      errors.push(new ErrorDetails(500, "Error finding website to color"));
      return null;
    }
  }
}
