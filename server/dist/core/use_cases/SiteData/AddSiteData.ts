import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";
import { ChangesDetails } from "./UpdateSite";

export class AddSiteData {
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
    url: string,
    pageUrl: string,
    changes: ChangesDetails,
    errors: ErrorDetails[]
  ): Promise<void> {
    const user = await this.userRepository.findByPk(userId);

    if (!user.isSparkAdmin) {
      errors.push(new ErrorDetails(403, "У вас нет таких прав."));
      return;
    }

    const page = await this.pageRepository.findByUrlWithCode(pageUrl);
    if (page === null) {
      errors.push(new ErrorDetails(404, "Страница с таким URL существует."));
      return;
    }

    const params = { url: url };
    const body = {
      code: page.website.websiteCode,
      ...changes,
    };

    await this.requestManager.postRequest(params, body, errors);
  }
}
