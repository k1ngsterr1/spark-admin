import { IWebsiteRepository } from "core/interfaces/IWebsiteRepository";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { NewWebsiteInput, UserRole } from "@core/utils/types";
import { validEmail, validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { AddWebsiteRequest, ChangeUserRoleRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";
import websiteCodeGenerator from "@core/utils/generateWebsiteCode"
import { ChangeUserRole } from "./ChangeUserRole";

export class AddWebsite {
  private websiteRepository: IWebsiteRepository;
  private userRepository: UserRepository;
  private changeUserRole: ChangeUserRole;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
    this.changeUserRole = new ChangeUserRole();
  }
  async execute(
    request: AddWebsiteRequest,
    errors: ErrorDetails[]
  ): Promise<Website> {
    try{
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
      console.log(errors);

      await this.websiteRepository.addUser(newWebsite.id, user.id, user.id, UserRole.Owner);

      return newWebsite;
    } catch(error){
      console.log(error);
      errors.push(new ErrorDetails(500, "Произошла непредвиденная ошибка при создание вебсайта."));
    }
  }
}
