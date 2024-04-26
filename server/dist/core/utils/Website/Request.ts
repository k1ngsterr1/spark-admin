import { UserRole } from "../types";

export type AddUserRequest = {
  email: string;
  role: string;
  websiteID: string;
  requesterID: number;
};
export type AddWebsiteRequest = {
  name: string;
  url: string;
  ownerID: number;
  ownerEmail: string;
};
export type ChangeUserRoleRequest = {
  websiteID: string;
  email: string;
  role: string;
}