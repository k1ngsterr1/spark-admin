import { AddSiteData } from "@core/use_cases/SiteData/AddSiteData";
import { GetSiteDatas } from "@core/use_cases/SiteData/GetSiteDatas";
import { UpdateSite } from "@core/use_cases/SiteData/UpdateSite";
import { UploadImage } from "@core/use_cases/SiteData/UploadImage";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";
import { uploadPath } from "server";
const fs = require("fs").promises;
import path from "path";

class EditController {
  private addSiteDataComponent: AddSiteData;
  private updateSiteComponent: UpdateSite;
  private uploadImageToSite: UploadImage;
  private getSiteDatas: GetSiteDatas;
  constructor() {
    this.updateSiteComponent = new UpdateSite();
    this.addSiteDataComponent = new AddSiteData();
    this.uploadImageToSite = new UploadImage();
    this.getSiteDatas = new GetSiteDatas();
  }
  async addSiteData(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId: number = req.user.id;
      const url: string = req.body.url;
      const pageUrl: string = req.body.pageUrl;
      const componentName: string = req.body.componentName;
      const value: string = req.body.value;

      await this.addSiteDataComponent.execute(
        userId,
        url,
        pageUrl,
        componentName,
        value,
        errors
      );

      if (errors.length > 0) {
        const current_errors = errors[0];
        res
          .status(current_errors.code)
          .json({ message: current_errors.details });
        return;
      }

      res.status(200).json({ message: "Успешно добавлен компонент." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при добавление" });
    }
  }

  async updateSite(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      console.log(req.user);
      const userId: number = req.user.id;
      const websiteId: string = req.body.websiteId;
      const url: string = req.body.url;
      const componentId: number = req.params.componentId;
      const newValue: string = req.body.newValue;

      await this.updateSiteComponent.execute(
        userId,
        websiteId,
        url,
        componentId,
        newValue,
        errors
      );

      if (errors.length > 0) {
        const current_errors = errors[0];
        res
          .status(current_errors.code)
          .json({ message: current_errors.details });
        return;
      }

      res.status(200).json({ message: "Сайт успешно обновлен" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при обновлении сайта" });
    }
  }

  async uploadImage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId: number = req.body.userId;
      const websiteId: string = req.body.websiteId;
      const url: string = req.body.url;
      const componentId: number = req.body.componentId;
      const imagePath: string = path.join(uploadPath, req.body.image);

      await this.uploadImageToSite.execute(
        userId,
        websiteId,
        url,
        componentId,
        imagePath,
        errors
      );

      await fs.unlink(imagePath, (error: unknown | any) => {
        if (error) {
          throw new Error(error.message);
        }
      });

      if (errors.length > 0) {
        const current_errors = errors[0];
        res
          .status(current_errors.code)
          .json({ message: current_errors.details });
        return;
      }

      res.status(200).json({ message: "Сайт успешно обновлен" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Ошибка при обновлении сайта" });
    }
  }

  async getSite(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const url: string = req.params.url;
      console.log(url);

      const components = await this.getSiteDatas.execute(url, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ content: components });
    } catch (error) {
      res.status(500).json({ message: "Не удалось получить контент с сайта" });
    }
  }
}

export default new EditController();
