import { NewPageInput } from "@core/utils/types";
import { Page } from "@infrastructure/models/pageModel";

export interface IPageRepository {
  create?(pageDetails: NewPageInput): Promise<Page>;
  findByWebsiteId?(websiteId: string): Promise<Page[]>;
  findByWebsiteName?(websiteName:string): Promise<Page[]>
  findByUrl(url: string): Promise<Page>;
  deletePageByUrl?(websiteId: string, url: string): Promise<void>;
}
