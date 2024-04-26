import { Website } from "infrastructure/models/websiteModel";

export interface NewWebsiteInput {
  name: string;
  url: string;
  owner: number;
  ownerEmail: string;
  users: any[];
  websiteCode: string;
  websiteCodeSignature: string;
}

export interface IWebsiteRepository {
  create?(userDetails: NewWebsiteInput): Promise<Website>;
  fetchHTMLContent?(url: string): Promise<any>;
  metaTagChecker?(htmlContent: any): Promise<any>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  addUserToWebsite?(websiteId: string, userItem: any): Promise<void>;
}
