import { IBlockComponentRepository } from "@core/interfaces/IBlockComponentRepository";
import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { AddBlockComponentRequest } from "@core/utils/Block/Request";
import { NewBlockComponentInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlockComponentRepository } from "@infrastructure/repositories/BlockComponentRepository";
import { BlockRepository } from "@infrastructure/repositories/BlockRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

// Индивидуальное добавление отдельного компонента
export class AddComponent {
  private blockRepository: IBlockRepository;
  private userRepository: IUserRepository;
  private blockComponentRepository: IBlockComponentRepository
  constructor() {
    this.blockRepository = new BlockRepository();
    this.userRepository = new UserRepository();
    this.blockComponentRepository = new BlockComponentRepository();
  }
  async execute(
    request: AddBlockComponentRequest,
    errors: ErrorDetails[]
  ): Promise<void> {
    const { userId, name, text, blockId, componentId } = request;

    const user = await this.userRepository.findByPk(userId);
    if (user === null) {
      errors.push(new ErrorDetails(404, "Пользователь не найден."));
      return;
    }

    if (!user.isSparkAdmin) {
      errors.push(new ErrorDetails(403, "У вас нет таких прав."));
      return;
    }

    const block = await this.blockRepository.findById(blockId);

    if(block === null){
      errors.push(new ErrorDetails(404, "Страницы не найдена"));
      return;
    }

    const newComponent: NewBlockComponentInput = {
      blockId: block.id,
      name: name,
      text: text,
      componentId: componentId
    };

    await this.blockComponentRepository.create(newComponent, errors);
  }
}
