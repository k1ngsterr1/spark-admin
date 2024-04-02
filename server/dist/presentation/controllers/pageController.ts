import { AddPage } from "@core/use_cases/Page/AddPage";
import { NewPageInput } from "@core/utils/types";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { Request, Response } from "express"

class PageController{
  private pageRepository: PageRepository;
  private addPageToWebsite: AddPage;
  constructor(){
    this.pageRepository = new PageRepository();
    this.addPageToWebsite = new AddPage();
  }
  async addPage(req: Request, res: Response): Promise<void>{
    try{
        const request: NewPageInput = {
            websiteId: req.body.websiteId,
            url: req.body.url,
            name: req.body.name,
            type: req.body.type
        }
        const page = this.addPageToWebsite.execute(request);
        res.status(201).json(page);
    } catch(error){
        res.status(500).json({message: "Ошибка добавления страницы для вебсайта", error: error.message});
    }
  }
}
export default new PageController();