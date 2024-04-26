import { NewWebsiteInput, UserRole } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { Website } from "infrastructure/models/websiteModel";

export interface IWebsiteRepository {
  create?(websiteDetails: NewWebsiteInput, errors: ErrorDetails[]): Promise<Website>;
  fetchHTMLContent?(url: string): Promise<any>;
  metaTagChecker?(htmlContent: any): Promise<any>;
  findByPk(primaryKey: string | number, errors: ErrorDetails[]): Promise<Website | null>
  findByOwner?(ownerId: number): Promise<Website[]>;
  findByUrl?(ownerId: number, name: string): Promise<Website>;
  addUser?(websiteId: string, userId: number, owner?: number, role?: UserRole): Promise<UserToWebsite>;
}
