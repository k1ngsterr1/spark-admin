import { IBlockComponentRepository } from "@core/interfaces/IBlockComponentRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { BlockComponentRepository } from "@infrastructure/repositories/BlockComponentRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

// Индивидуальное изменения отдельного компонента
export class UpdateComponent {
  private userRepository: IUserRepository;
  private blockComponentRepository: IBlockComponentRepository
  constructor() {
    this.userRepository = new UserRepository();
    this.blockComponentRepository = new BlockComponentRepository();
  }
  async execute(id: string, value: string, errors: ErrorDetails[]): Promise<void> {
    const ids = id.split('-');
    const componentId: number = parseInt(ids[0]), userId: number = parseInt(ids[1]);
    const user = await this.userRepository.findByPk(userId);

    if(user === null){
        errors.push(new ErrorDetails(404, "Пользователь не найден."));
        return;
    }

    const component = await this.blockComponentRepository.findByPk(componentId, errors);
    if(component === null){
        errors.push(new ErrorDetails(404, "Компонент не найден."));
        return;
    }

    component.text = value;
    console.log(value);
    await component.save();

  }
}
