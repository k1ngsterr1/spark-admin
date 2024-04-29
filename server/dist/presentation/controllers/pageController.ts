import { AddPage } from "@core/use_cases/Page/AddPage";
import { DeletePage } from "@core/use_cases/Page/DeletePage";
import { GetPages } from "@core/use_cases/Page/GetPages";
import { JWTService } from "@core/use_cases/User/JWTService";
import { NewPageRequest } from "@core/utils/Page/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express"

class PageController{
  private addPageToWebsite: AddPage;
  private getPagesByWebsiteId: GetPages;
  private deletePageByWebsiteId: DeletePage;
  private jwtService: JWTService;
  constructor(){
    this.addPageToWebsite = new AddPage();
    this.getPagesByWebsiteId = new GetPages();
    this.deletePageByWebsiteId = new DeletePage();
    this.jwtService = new JWTService();
  }
  async addPage(req: Request, res: Response): Promise<void>{
    let errors: ErrorDetails[] = [];
    try{
      const request: NewPageRequest = {
          websiteId: req.body.websiteId,
          userId: req.user.id,
          url: req.body.url,
          name: req.body.name,
          type: req.body.type
        }

        await this.addPageToWebsite.execute(request, errors);

        if(errors.length > 0){
          const current_error = errors[0];
          res.status(current_error.code).json({ message: current_error.details });
          return; 
        }
        res.status(201).json({ message: "Страница добавлена" });
    } catch(error){
        res.status(500).json({message: "Ошибка добавления страницы для вебсайта", error: error.message});
    }
  }
  async getPages(req: Request, res: Response): Promise<void>{
    const errors: ErrorDetails[] = [];
    
    try{
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const websiteId: string = req.params.websiteId;
      console.log(websiteId);

      const pages = await this.getPagesByWebsiteId.execute(websiteId, user.id, errors);

      if(errors.length > 0){
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return; 
      }

      res.status(200).json({ pages: pages });
    } catch(error){
      res.status(500).json({message: "Ошибка с получением страниц", error: error.message});
    }
  }
  async deletePages(req: Request, res: Response): Promise<void>{
    const errors: ErrorDetails[] = [];
    try{
      const websiteId: string = req.params.websiteId;
      const url: string = req.body.url;

      await this.deletePageByWebsiteId.execute(websiteId, req.user.id, url, errors);
      
      if(errors.length > 0){
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return; 
      }

      res.status(200).json({ message: "Страница была удалена" });
    } catch(error){
      res.status(500).json({ message: "Ошибка удаление страницы" , error: error.message})
    }
  }
}
export default new PageController();