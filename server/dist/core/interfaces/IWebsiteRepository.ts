import { NewWebsiteInput, UserRole } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export interface IWebsiteRepository {
  // Interface для создания веб-сайта
  create?(
    websiteDetails: NewWebsiteInput,
    errors: ErrorDetails[]
  ): Promise<Website>;

  // Interface для парсинга html
  fetchHTMLContent?(url: string, errors: ErrorDetails[]): Promise<any>;

  // Interface для проверки мета-тэгов
  metaTagChecker?(htmlContent: any, errors: ErrorDetails[]): Promise<any>;

  // Interface для получения кода по ссылке
  getCodeByUrl?(
    ownerId: number,
    url: string,
    errors: ErrorDetails[]
  ): Promise<string>;

  // Interface для получения сайта по ID
  findByPk(
    primaryKey: string | number,
    errors: ErrorDetails[]
  ): Promise<Website | null>;

  // Interface для получения сайта по ID владельца
  findByOwner?(ownerId: number, errors: ErrorDetails[]): Promise<Website[]>;

  // Interface для поиска сайта по url
  findByUrl?(
    ownerId: number,
    name: string,
    errors: ErrorDetails[]
  ): Promise<Website>;

  // Interface для добавление пользователя на сайт
  addUser?(
    websiteId: string,
    userId: number,
    owner?: number,
    role?: UserRole,
    errors?: ErrorDetails[]
  ): Promise<UserToWebsite>;

  //Interface для получение всех пользователей со всех вебсайтов
  findWebsitesUsers?(errors: ErrorDetails[]): Promise<Website[]>;
}
