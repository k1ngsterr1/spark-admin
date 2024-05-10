import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { NewPageCardInput } from "@core/utils/types";
import { PageCard } from "@infrastructure/models/pageCardModel";
import sequelize from "infrastructure/config/sequelize";

export class PageCardRepository implements IPageCardRepository {
  async create(pageCardDetails: NewPageCardInput): Promise<PageCard> {
    return await sequelize.getRepository(PageCard).create(pageCardDetails);
  }
}
