import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import { promisify } from "util";
import fs, { mkdirSync } from "fs";

const path = require("path");
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
    console.log(
      "Path is here:",
      path.join(__dirname, "../../../templates/temporary")
    );

    const targetDir = path.join(__dirname, "../../../templates/temporary");
    console.log("target dir is here:", path.join(targetDir, file.originalname));
    const targetPath = path.join(targetDir, file.originalname);

    try {
      console.log("file path is here:", file.path);

      const fileType = getFileType(file.path);
      // Ensure target directory exists
      await mkdirSync(targetDir, { recursive: true });

      await renameAsync(file.path, targetPath);

      if (fileType === "zip") {
        await extractZip(targetPath, targetDir);
        console.log("It is a zip!");
      } else if (fileType === "rar") {
        console.log("It is a rar!");
        await extractRarFile(targetPath, targetDir);
      } else {
        throw new Error("Unsupported file type");
      }

      return { message: "File uploaded successfully" };
    } catch (error) {
      errors.push({ details: error.message, code: 400 });
      return;
    }
  }
}
