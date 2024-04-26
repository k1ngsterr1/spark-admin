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
