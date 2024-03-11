import { UserItems } from "@infrastructure/models/websiteModel";

export enum UserRole {
  Owner = "owner",
  Admin = "admin",
  Editor = "editor",
};

export interface NewUserInput {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}

export type AddWebsiteRequest = {
  name: string,
  url: string,
  id: number,
  email: string
}

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type UserPayload = {
  id: number;
  email: string;
  role: string;
};

export type UserVerification = {
  id: number;
  code: string;
}

export interface NewWebsiteInput {
  name: string;
  url: string;
  owner: number;
  users: UserItems[];
}

export interface NewUserInput {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}