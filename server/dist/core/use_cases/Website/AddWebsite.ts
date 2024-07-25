import { IWebsiteRepository } from "core/interfaces/IWebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { NewPageInput, NewWebsiteInput, UserRole } from "@core/utils/types";
import { validEmail, validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";

import websiteCodeGenerator from "@core/utils/generateWebsiteCode";
import { IColorRepository } from "@core/interfaces/IColorRepository";
import { ColorRepository } from "@infrastructure/repositories/ColorRepository";

export class AddWebsite {
  private websiteRepository: IWebsiteRepository;
  private pageRepository: IPageRepository;
  private userRepository: UserRepository;
  private colorRepository: IColorRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.pageRepository = new PageRepository();
    this.websiteRepository = new WebsiteRepository();
    this.colorRepository = new ColorRepository();
  }
  async execute(
    request: AddWebsiteRequest,
    errors: ErrorDetails[]
  ): Promise<Website> {
    try {
      const { name, url, ownerID, ownerEmail } = request;

      const isValidUrl = await validURL(url);
      const isValidEmail = await validEmail(ownerEmail);

      if (!isValidUrl) {
        errors.push(new ErrorDetails(400, "Неправильная URL"));
        return;
      }
      if (!isValidEmail) {
        errors.push(new ErrorDetails(400, "Неправильный email"));
        return;
      }
      const { code, codeSignature } = await websiteCodeGenerator(url);
      const user = await this.userRepository.findByEmail(ownerEmail);

      if (user == null) {
        errors.push(new ErrorDetails(404, "Пользователь не был найден"));
        return;
      }

      const newWebsiteDetails: NewWebsiteInput = {
        name: name,
        url: url,
        owner: ownerID,
        ownerEmail: ownerEmail,
        websiteCode: code,
        websiteSignature: codeSignature,
        websiteCodeSignature: codeSignature,
      };

      const newWebsite = await this.websiteRepository.create(
        newWebsiteDetails,
        errors
      );

      await this.websiteRepository.addUser(
        newWebsite.id,
        user.id,
        user.id,
        UserRole.Owner
      );

      const pageInput: NewPageInput = {
        websiteId: newWebsite.id,
        url: newWebsite.url,
        name: newWebsite.name,
        type: "Main",
      };

      await this.pageRepository.create(pageInput);

      try {
        await this.colorRepository.addWebsite(newWebsite.id, 1, errors);
        await this.colorRepository.addWebsite(newWebsite.id, 2, errors);
        await this.colorRepository.addWebsite(newWebsite.id, 3, errors);
        await this.colorRepository.addWebsite(newWebsite.id, 4, errors);
        await this.colorRepository.addWebsite(newWebsite.id, 5, errors);
        await this.colorRepository.addWebsite(newWebsite.id, 6, errors);
        await this.colorRepository.addWebsite(newWebsite.id, 7, errors);
      } catch (error) {
        console.log("Error when adding default website colors" + error);
      }
      return newWebsite;
    } catch (error) {
      console.log(error);
      errors.push(
        new ErrorDetails(
          500,
          "Произошла непредвиденная ошибка при создание вебсайта."
        )
      );
    }
  }
}
