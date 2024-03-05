import { UserItems, Website } from "@models/websiteModel";

export interface NewWebsiteInput {
  name: string;
  url: string;
  owner: string;
  users: UserItems[];
}

export interface IWebsiteRepository {
  create?(userDetails: NewWebsiteInput): Promise<Website>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  addUserToWebsite?(websiteId: string, userItem: UserItems): Promise<void>;
}
