import { Page } from "@infrastructure/models/pageModel";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { ErrorDetails } from "@core/utils/utils";

// Получение страницы по ID
export class GetPageById {
  private pageRepository: IPageRepository;
  constructor() {
    this.pageRepository = new PageRepository();
  }

  async execute(pageId: string, errors: ErrorDetails[]): Promise<Page> {
    const page = await this.pageRepository.findByPageId(pageId);

    if (page === null) {
      errors.push(new ErrorDetails(404, "Страница не найдена!"));
      return;
    }

    return page;
  }
}
