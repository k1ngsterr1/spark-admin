import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { NewPageCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { PageCard } from "@infrastructure/models/pageCardModel";
import sequelize from "infrastructure/config/sequelize";

export class PageCardRepository implements IPageCardRepository {
  async create(pageCardDetails: NewPageCardInput, errors: ErrorDetails[]): Promise<PageCard> {
    try{
      return await sequelize.getRepository(PageCard).create(pageCardDetails);
    }
    catch(error){
      errors.push(new ErrorDetails(500, error.message));
      return null;
    }
  }
}
