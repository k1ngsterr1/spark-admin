import { Block } from "@infrastructure/models/blockModel";
import { Color } from "@infrastructure/models/colorModel";
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
  theme: string;
  isSparkAdmin: boolean;
  verificationCode: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserToColorAttributes {
  id: number;
  userId: number;
  colorId: number;
  user: User;
  color: Color;
}

export interface WebsiteToColorAttributes {
  id: number;
  websiteId: string;
  colorId: number;
  website: Website;
  color: Color;
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

export interface BlogCardAttributes {
  id: string | number;
  image: string;
  title: string;
  href: string;
  website: Website;
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

export interface ThemeAttributes {
  id: number;
  theme: string;
}

export interface LanguageAttributes {
  id: number;
  language: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SiteDataAttributes {
  id: number;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormAttributes {
  id: number;
  code: string;
  name: string;
  phoneNumber: string;
  email: string;
  date: Date;
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
export interface BlockComponentAttributes {
  id: number;
  blockId: number;
  block: Block;
  name: string;
  text: string;
  attributes: object;
}

export interface BlockAttributes {
  id: number;
  cards: PageCard[];
  name: string;
  title: string;
  content: string;
  type: string;
  image_url: string;
  video_url: string;
}

export interface ColorAttributes {
  id: number;
  value: string;
}

export interface CardToBlockAttributes {
  id: number;
  pageCardId: number;
  blockId: number;
  card: PageCard;
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

export interface NewFormInput {
  name: string;
  phoneNumber: string;
  email: string;
  date: Date;
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

export interface NewSiteDataInput {
  pageId: number;
  name: string;
  value: string;
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

export interface NewBlockComponentInput {
  blockId: number;
  name: string;
  text: string;
  componentId: number;
}

export interface NewBlockInput {
  name: string;
  title: string;
  description: string;
  type: string;
  css_link: string;
  image_url?: string;
  video_url?: string;
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
  SparkAdmin = "sparkAdmin",
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

// Типы для карточки блогов
export type NewBlogCardInput = {
  image: string;
  title: string;
  href: string;
};
