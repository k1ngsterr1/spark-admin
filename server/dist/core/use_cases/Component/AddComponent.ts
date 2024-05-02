import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { NewComponentRequest } from "@core/utils/Component/Request";
import { NewComponentInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validURL } from "@core/utils/validators";
import { ComponentRepository } from "@infrastructure/repositories/ComponentRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";

export class AddComponent {
  private pageRepository: IPageRepository;
  private componentRepository: IComponentRepository;
  constructor() {
    this.pageRepository = new PageRepository();
    this.componentRepository = new ComponentRepository();
  }
  async execute(request: NewComponentRequest, errors: ErrorDetails[]): Promise<void> {
    const { url, name, text, blockId } = request;

    const isValidUrl = await validURL(url);
    if(!isValidUrl) {
        errors.push(new ErrorDetails(400, "Invalid URL"));
        return;
    }
    
    const page = await this.pageRepository.findByUrl(url);

    const newComponent: NewComponentInput = {
        pageId: page.id,
        name: name,
        text: text,
        blockId: blockId,
    }

    await this.componentRepository.create(newComponent);
  }
}
