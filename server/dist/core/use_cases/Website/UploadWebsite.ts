import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const { extractRarFile } = require("@services/unrarService");
const { extractZip } = require("@services/extractZip");
const { getFileType } = require("@services/getFileType");

const renameAsync = promisify(fs.rename);

export class UploadWebsite {
  private websiteRepository: IWebsiteRepository;

  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  async execute(file: any, errors: ErrorDetails[]): Promise<any> {
    const targetDir = path.join(__dirname, "templates/temporary");
    const targetPath = path.join(targetDir, file.originalName);

    try {
      const fileType = getFileType(file.originalname);

      await renameAsync(file.path, targetPath);

      // if (fileType === "zip") {
      //   await extractZip(targetPath, targetDir);
      //   console.log("It is a zip!");
      // } else if (fileType === "rar") {
      //   console.log("It is a rar!");
      //   await extractRarFile(targetPath, targetDir);
      // } else {
      //   throw new Error("Unsupported file type");
      // }

      return { message: "File uploaded successfully" };
    } catch (error) {
      errors.push({ details: error.message, code: "UPLOAD_ERROR" });
      return;
    }
  }
}
