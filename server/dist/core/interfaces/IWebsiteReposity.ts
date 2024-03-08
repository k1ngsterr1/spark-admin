import { UserItems, Website } from "infrastructure/models/websiteModel";

export interface NewWebsiteInput {
  name: string;
  url: string;
  owner: number;
  ownerEmail: string;
  users: UserItems[];
}

export interface IWebsiteRepository {
  create?(userDetails: NewWebsiteInput): Promise<Website>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  addUserToWebsite?(websiteId: string, userItem: UserItems): Promise<void>;
}
