import { NewPageInput } from "@core/utils/types";
import { Page } from "@infrastructure/models/pageModel";

export interface IPageRepository {
  create?(pageDetails: NewPageInput): Promise<Page>;
}
