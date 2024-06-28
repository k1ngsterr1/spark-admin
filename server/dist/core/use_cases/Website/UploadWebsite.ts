import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const renameAsync = promisify(fs.rename);

export class UploadWebsite {
  private websiteRepository: IWebsiteRepository;

  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(request: Request, errors: ErrorDetails[]): Promise<any> {
    console.log("request:", request);

    const file = (request as any).file;

    if (!file) {
      errors.push({ details: "No file provided", code: "UPLOAD_ERROR" });
      return;
    }

    const targetDir = path.join(__dirname, "templates/temporary");
    const targetPath = path.join(targetDir, file.originalName);

    try {
      await renameAsync(file.path, targetPath);

      return { message: "File uploaded successfully" };
    } catch (error) {
      errors.push({ details: error.message, code: "UPLOAD_ERROR" });
      return;
    }
  }
}
