import { ErrorDetails } from "@core/utils/utils";
import RequestManager from "@services/createRequest";

export class GetSiteDatas {
  private requestManager: RequestManager;
  constructor() {
    this.requestManager = new RequestManager();
  }
  async execute(url: string = "http://localhost:4001/api/components/get-components", errors: ErrorDetails[]): Promise<any> {
    const params = { url: url };

    const components = await this.requestManager.getRequest(params, errors);

    return components;
  }
}
