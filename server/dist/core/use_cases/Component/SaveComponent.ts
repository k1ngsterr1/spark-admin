import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { SaveComponentRequest } from "@core/utils/Component/Request";
import { ErrorDetails } from "@core/utils/utils";
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
  ): Promise<void> {}
}
