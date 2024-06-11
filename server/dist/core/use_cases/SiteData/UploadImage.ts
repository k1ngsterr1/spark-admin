import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { ImageUpload } from "@infrastructure/config/cloudinary";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";

export class UploadImage {
  private userRepository: IUserRepository;
  private pageRepository: IPageRepository;
  private requestManager: RequestManager;
  constructor() {
    this.userRepository = new UserRepository();
    this.pageRepository = new PageRepository();
    this.requestManager = new RequestManager();
  }
  async execute(
    userId: number,
    websiteId: string,
    url: string,
    componentId: number,
    imagePath: string,
    errors: ErrorDetails[]
  ): Promise<void> {
    const user = await this.userRepository.getUserFromWebsite(
      websiteId,
      userId
    );

    console.log(websiteId, user, userId);

    if (!user) {
      console.log("POPKA");
      errors.push(new ErrorDetails(404, "Пользователь не найден."));
      return;
    }
    const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);

    if (!isValidUser) {
      errors.push(new ErrorDetails(403, "У вас не достаточно прав."));
      return;
    }

    const img_url = await ImageUpload(imagePath, errors);

    url += `/${componentId}`;
    const params = { url: url };
    const body = { code: user.website.websiteCode, value: img_url };

    await this.requestManager.postRequest(params, body, errors);
  }
}
