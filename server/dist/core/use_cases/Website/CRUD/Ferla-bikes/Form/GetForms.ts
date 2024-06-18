import { ErrorDetails } from "@core/utils/utils";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";

export class GetForms {
  private requestManager: RequestManager;
  private userRepository: UserRepository;
  constructor() {
    this.requestManager = new RequestManager();
    this.userRepository = new UserRepository();
  }
  async execute(
    url: string,
    websiteId: string,
    userId: number,
    errors: ErrorDetails[]
  ) {
    const user = await this.userRepository.getUserFromWebsiteWithCode(
      websiteId,
      userId
    );
    const updatedUrl = url + `/${user.website.websiteCode}`;
    const params = { url: updatedUrl };

    const forms = await this.requestManager.getRequest(params, errors);

    return forms;
  }
}
