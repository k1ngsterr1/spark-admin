import { User } from "@infrastructure/models/userModel";
import { Website } from "@infrastructure/models/websiteModel";

export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  verificationCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserRole {
  Owner = "owner",
  Admin = "admin",
  Editor = "editor",
  User = "user"
};

export interface NewUserInput {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}

export type AddUserRequest = {
  email: string,
  role: string,
  websiteID: string,
  requesterID: number
}

export interface WebsiteAttributes {
  id: string;
  name: string;
  url: string;
  owner: number;
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
}

export interface NewUserInput {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}

export interface NewPageInput {
  websiteId: string;
  url: string;
  name: string;
  type: string;
}

export interface PageAttributes{
  id: number;
  websiteId: string;
  website: Website;
  url: string;
  name: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}