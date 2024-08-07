import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { NewPageCardRequest } from "@core/utils/PageCard/Reqeust";
import { NewPageCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validURL } from "@core/utils/validators";
import { PageCard } from "@infrastructure/models/pageCardModel";
import { PageCardRepository } from "@infrastructure/repositories/PageCardRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddPageCard {
  private pageCardRepository: IPageCardRepository;
  private userRepository: IUserRepository;
  constructor() {
    this.pageCardRepository = new PageCardRepository();
    this.userRepository = new UserRepository();
  }
  async execute(request: NewPageCardRequest, errors: ErrorDetails[]): Promise<PageCard> {
    const { userId, url, name, description, type } = request;

    const isValidUrl = await validURL(url);
    if(!isValidUrl) {
      errors.push(new ErrorDetails(400, "Некорректный URL."));
      return null;
    }

    const user = await this.userRepository.findByPk(userId);
    if(user.isSparkAdmin !== true){
      errors.push(new ErrorDetails(401, "Недостаточно прав."));
      return null;
    }

    const newPageCard: NewPageCardInput = {
      url: url,
      name: name,
      description: description,
      type: type,
    }

    const pageCard = await this.pageCardRepository.create(newPageCard, errors);

    return pageCard;
  }
}
