import { IPageRepository } from "@core/interfaces/IPageRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Page } from "@infrastructure/models/pageModel";
import { PageRepository } from "@infrastructure/repositories/PageRepository";

export class GetPage {
  private pageRepository: IPageRepository;
  constructor() {
    this.pageRepository = new PageRepository();
  }
  async execute(url: string, errors: ErrorDetails[]): Promise<Page> {
    const page = await this.pageRepository.findByUrl(url);
    if (page === null) {
      errors.push(new ErrorDetails(404, "Страница не найдена"));
      return;
    }
    return page;
  }
}
