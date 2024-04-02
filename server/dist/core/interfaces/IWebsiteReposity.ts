import { Website } from "infrastructure/models/websiteModel";
import { NewWebsiteInput } from "@core/utils/types";

export interface IWebsiteRepository {
  create?(userDetails): Promise<Website>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  findWebsiteByName?(ownerId: number, name: string): Promise<Website>;
}
