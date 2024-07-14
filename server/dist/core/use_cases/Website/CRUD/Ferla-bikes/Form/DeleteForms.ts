import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";

export class DeleteForm {
  private userRepository: IUserRepository;
  private requestManager: RequestManager;
  constructor() {
    this.userRepository = new UserRepository();
    this.requestManager = new RequestManager();
  }
  async execute(
    userId: number,
    websiteID: string,
    url: string,
    formId: number,
    errors: ErrorDetails[]
  ) {
    const user = await this.userRepository.getUserFromWebsiteWithCode(
      websiteID,
      userId
    );
    if (!user) {
      errors.push(new ErrorDetails(404, "Пользователь не найден."));
      return;
    }

    const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);

    if (!isValidUser) {
      errors.push(new ErrorDetails(403, "У вас недостаточно прав."));
      return;
    }

    const updatedUrl = url + `/${formId}` + `/${user.website.websiteCode}`;

    const params = { url: updatedUrl };

    await this.requestManager.deleteRequest(params, null, errors);
  }
}
