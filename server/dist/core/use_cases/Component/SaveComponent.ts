import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { SaveComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
import { validURL } from "@core/utils/validators";
import { ComponentRepository } from "@infrastructure/repositories/ComponentRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class SaveComponent {
  private pageRepository: IPageRepository;
  private componentRepository: IComponentRepository;
  private userRepository: IUserRepository;

  constructor() {
    this.pageRepository = new PageRepository();
    this.userRepository = new UserRepository();
    this.componentRepository = new ComponentRepository();
  }

  async execute(
    request: SaveComponentRequest,
    errors: ErrorDetails[]
  ): Promise<void> {
    const { componentId, userId, url, name, text, blockId, attributes, elementType, content } = request;

    const isValidUrl = await validURL(url);
    if (!isValidUrl) {
      errors.push(new ErrorDetails(400, "Неправильный URL"));
      return;
    }
    const user = await this.userRepository.findByPk(userId);
    if (user === null) {
      errors.push(new ErrorDetails(404, "Пользователь не найден."));
      return;
    }

    if (!user.isSparkAdmin) {
      errors.push(new ErrorDetails(403, "У вас нет таких прав."));
      return;
    }

    const page = await this.pageRepository.findByUrl(url);

    if(page === null){
      errors.push(new ErrorDetails(404, "Страницы не найдена"));
      return;
    }

    const component = await this.componentRepository.findById(componentId);
    if (component === null) {
      errors.push(new ErrorDetails(404, "Компонент не найден."));
      return;
    }

    await component.update({
      name: name,
      text: text,
      blockId: blockId,
      attributes: attributes,
      elementType: elementType,
      content: content,
    });
  }
}
