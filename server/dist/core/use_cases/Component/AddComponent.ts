import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { NewComponentRequest } from "@core/utils/Component/Request";
import { NewComponentInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validURL } from "@core/utils/validators";
import { ComponentRepository } from "@infrastructure/repositories/ComponentRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

// Индивидуальное добавление отдельного компонента
export class AddComponent {
  private pageRepository: IPageRepository;
  private componentRepository: IComponentRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.pageRepository = new PageRepository();
    this.userRepository = new UserRepository();
    this.componentRepository = new ComponentRepository();
  }
  async execute(
    request: NewComponentRequest,
    errors: ErrorDetails[]
  ): Promise<void> {
    const { userId, url, name, text, blockId } = request;

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

    const newComponent: NewComponentInput = {
      pageId: page.id,
      name: name,
      text: text,
      blockId: blockId,
    };

    await this.componentRepository.create(newComponent);
  }
}
