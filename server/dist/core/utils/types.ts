import { Block } from "@infrastructure/models/blockModel";
import { PageCard } from "@infrastructure/models/pageCardModel";
import { Page } from "@infrastructure/models/pageModel";
import { User } from "@infrastructure/models/userModel";
import { Website } from "@infrastructure/models/websiteModel";

//Аттрибуты
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
export interface PageAttributes {
  id: number;
  websiteId: string;
  website: Website;
  url: string;
  name: string;
  type: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PageCardAttributes {
  id: number;
  url: string;
  name: string;
  description: string;
  type: string;
}

export interface ComponentAttributes {
  id: number;
  pageId: number;
  page: Page;
  name: string;
  text: string;
  blockId: number;
  elementType: string;
  content: string;
  attributes: object;
}

export interface BlockAttributes {
  id: number;
  cards: PageCard[];
  name: string;
  title: string;
  content: string;
  image_url: string;
  video_url: string;
}

export interface CardToBlockAttributes {
  id: number;
  cardId: number;
  blockId: number;
  card: PageCard,
  block: Block; 
}

export interface UserToWebsiteAttributes {
  id: number;
  websiteId: string;
  userId: number;
  owner: number;
  role: string;
}

export interface NewWebsiteInput {
  name: string;
  url: string;
  owner: number;
  ownerEmail: string;
  websiteCode: string;
  websiteSignature: string;
  websiteCodeSignature: string;
}

export interface NewPageInput {
  websiteId: string;
  url: string;
  name: string;
  type: string;
}

export interface NewPageCardInput {
  url: string;
  // video: Video;
  name: string;
  description: string;
  type: string;
}

export interface NewComponentInput {
  pageId: number;
  elementType: string;
  content: string;
  attributes: object;
  name: string;
  text: string;
  blockId: number;
}

export interface NewUserInput {
  username: string;
  email: string;
  password: string;
}

// Типы для нумерация
export enum UserRole {
  Owner = "owner",
  Admin = "admin",
  Editor = "editor",
  User = "user",
}

export enum WebsiteCommand {
  update = "Update",
  create = "Create",
  delete = "Delete",
  get = "Get",
}

// Типы
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
};
