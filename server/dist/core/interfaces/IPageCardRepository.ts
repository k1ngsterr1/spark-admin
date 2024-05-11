import { NewPageCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { PageCard } from "@infrastructure/models/pageCardModel";

export interface IPageCardRepository {
  create?(pageCardDetails: NewPageCardInput, errors: ErrorDetails[]): Promise<PageCard>;
  findByType?(pageType: string): Promise<PageCard[] | PageCard>;
}
