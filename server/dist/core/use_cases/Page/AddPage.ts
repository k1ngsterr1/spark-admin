import { NewPageInput } from "@core/utils/types";
import { PageRepository } from "@infrastructure/repositories/PageRepository";

export class AddPage {
  private pageRepository: PageRepository;
  constructor() {
    this.pageRepository = new PageRepository();
  }
  async execute(request: NewPageInput): Promise<void> {
    await this.pageRepository.create(request);
  }
}
