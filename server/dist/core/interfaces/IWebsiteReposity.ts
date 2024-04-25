import { Website } from "infrastructure/models/websiteModel";
import { NewWebsiteInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";

export interface IWebsiteRepository {
  create?(websiteDetails: NewWebsiteInput, errors: ErrorDetails[]): Promise<Website>;
  findByPk?(primaryKey: string | number): Promise<Website | null>;
  findByOwner?(ownerId: number): Promise<Website[]>;
  findByUrl?(ownerId: number, name: string): Promise<Website>;
}
