import { Page } from "@infrastructure/models/pageModel";
import { User } from "@infrastructure/models/userModel";
import { Website } from "@infrastructure/models/websiteModel";
//Attributes
export interface UserAttributes {
  id: number;
  websiteId: string;
  website: Website;
  username: string;
  email: string;
  password: string;
  role: string;
  isSparkAdmin: boolean;
  verificationCode: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface WebsiteAttributes {
  id: string;
  users: User[];
  pages: Page[];
  name: string;
  url: string;
  owner: number;
  createdAt: Date;
  updatedAt: Date;
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

export interface NewPageInput {
  websiteId: string;
  url: string;
  name: string;
  type: string;
}

export enum WebsiteCommand {
  update = "Update",
  create = "Create",
  delete = "Delete",
  get = "Get",
}