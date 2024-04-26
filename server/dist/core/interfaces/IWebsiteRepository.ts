import { NewWebsiteInput } from "@core/utils/types";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { Website } from "infrastructure/models/websiteModel";

export interface IWebsiteRepository {
  create?(userDetails: NewWebsiteInput): Promise<Website>;
  fetchHTMLContent?(url: string): Promise<any>;
  metaTagChecker?(htmlContent: any): Promise<any>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  addUser?(websiteId: string, userId: number, isOwner: boolean): Promise<UserToWebsite>;
}
