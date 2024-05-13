import { NewPageCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import CardToBlock from "@infrastructure/models/cardToblockModel";
import { PageCard } from "@infrastructure/models/pageCardModel";

export interface IPageCardRepository {
  create?(pageCardDetails: NewPageCardInput, errors: ErrorDetails[]): Promise<PageCard>;
  findByType?(pageType: string): Promise<PageCard[] | PageCard>;
  findByName?(name: string, errors: ErrorDetails[]): Promise<PageCard>;
  addBlock?(blockId: number, pageCardId: number, errors: ErrorDetails[]): Promise<CardToBlock>;
}
