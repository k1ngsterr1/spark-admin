import { ErrorDetails } from "@core/utils/utils";
import { Color } from "@infrastructure/models/colorModel";
import { UserToColor } from "@infrastructure/models/userToColorModel";
import { WebsiteToColor } from "@infrastructure/models/websiteToColor";

export interface IColorRepository {
  addColor(colorDetails: string, errors: ErrorDetails[]): Promise<Color | null>;
  addUser(
    userId: number,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<UserToColor | null>;
  addWebsite(
    websiteId: string,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<WebsiteToColor | null>;
  findByColor(value: string, errors: ErrorDetails[]): Promise<Color | null>;
  findUserToColor(
    userId: number,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<UserToColor | null>;
  findWebsiteToColor(
    websiteId: string,
    colorId: number,
    errors: ErrorDetails[]
  ): Promise<WebsiteToColor | null>;
}
