import { NewPageCardInput } from "@core/utils/types";
import { PageCard } from "@infrastructure/models/pageCardModel";

export interface IPageCardRepository {
  create?(pageCardDetails: NewPageCardInput): Promise<PageCard>;
  findByType?(pageType: string): Promise<PageCard[] | PageCard>;
}
