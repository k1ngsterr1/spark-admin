import { AddSiteData } from "@core/use_cases/SiteData/AddSiteData";
import { UpdateSite } from "@core/use_cases/SiteData/UpdateSite";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class EditController {
  private addSiteDataComponent: AddSiteData;
  private updateSiteComponent: UpdateSite;
  constructor() {
    this.updateSiteComponent = new UpdateSite();
    this.addSiteDataComponent = new AddSiteData();
  }
  async addSiteData(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const userId = req.user.id;
      const siteName: string = req.params.siteName;
      const value: string = req.body.value;

      await this.addSiteDataComponent.execute(userId, siteName, value, errors);

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
      const siteName: string = req.params.siteName;
      const componentId: number = req.params.componentId;
      const newValue: string = req.body.newValue;

      await this.updateSiteComponent.execute(
        siteName,
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
      res.status(500).json({ message: "Ошибка при обновлении AgroPV" });
    }
  }
  // async getSite(req: Request, res: Response): Promise<void>{
  //     try{
  //         const siteName: string = req.params.siteName;
  //         res.sendFile(buildRoute+siteName+"/index.html");
  //     }catch(error){

  //     }
  // }
}

export default new EditController();
