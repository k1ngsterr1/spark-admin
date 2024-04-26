import { IWebsiteRepository } from "core/interfaces/IWebsiteReposity";
import { Website } from "infrastructure/models/websiteModel";
import { JWTService } from "../User/JWTService";
import { WebsiteRepository } from "infrastructure/repositories/WebsiteRepository";
import { NewWebsiteInput } from "@core/utils/types";
import { validEmail, validURL } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { AddWebsiteRequest } from "@core/utils/Website/Request";
import { ErrorDetails } from "@core/utils/utils";

const websiteCodeGenerator = require("@core/utils/generateWebsiteCode");

export class AddWebsite {
  private websiteRepository: WebsiteRepository;
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(
    request: AddWebsiteRequest,
    errors: ErrorDetails[]
  ): Promise<Website> {
    const { name, url, owner, ownerEmail } = request;

    const isValidUrl = await validURL(url);
    const isValidEmail = validEmail(ownerEmail);

    if (!isValidUrl) {
      errors.push(new ErrorDetails(400, "Неверная URL"));
      return;
    }

    if (!isValidEmail) {
      errors.push(new ErrorDetails(400, "Неверный Email"));
      return;
    }

    const { code, codeSignature } = websiteCodeGenerator(url);
    // const { user, signature } = await this.userRepository.findByEmail(email);

    // if (user == null) {
    //   errors.push(new ErrorDetails(404, "Пользователь не найден"));
    //   return;
    // }

    console.log("code & signature", code, codeSignature);

    const newWebsiteDetails: NewWebsiteInput = {
      name,
      url,
      owner,
      ownerEmail,
      users: [
        {
          email: ownerEmail,
          id: owner,
          role: "Owner",
        },
      ],
      websiteCode: code,
    };

    const newWebsite = await this.websiteRepository.create(
      newWebsiteDetails,
      errors
    );

    // user.websiteId = newWebsite.id;
    // await user.save();

    return newWebsite;
  }
}
