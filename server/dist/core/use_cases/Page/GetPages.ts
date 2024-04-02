import { Page } from "@infrastructure/models/pageModel";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";

export class GetPages {
  private pageRepository: IPageRepository;
  constructor() {
    this.pageRepository = new PageRepository();
  }

  async execute(websiteId: string): Promise<Page[]> {
    const pages = await this.pageRepository.findByWebsiteId(websiteId);
    return pages;
  }
}
