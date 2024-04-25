import { AddPage } from "@core/use_cases/Page/AddPage";
import { DeletePage } from "@core/use_cases/Page/DeletePage";
import { GetPages } from "@core/use_cases/Page/GetPages";
import { JWTService } from "@core/use_cases/User/JWTService";
import { NewPageRequest } from "@core/utils/Page/Request";
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
    try{
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const request: NewPageRequest = {
            websiteId: req.body.websiteId,
            userId: user.id,
            url: req.body.url,
            name: req.body.name,
            type: req.body.type
        }
        await this.addPageToWebsite.execute(request);
        res.status(201).json({ message: "Страница добавлена" });
    } catch(error){
        res.status(500).json({message: "Ошибка добавления страницы для вебсайта", error: error.message});
    }
  }
  async getPages(req: Request, res: Response): Promise<void>{
    try{
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const websiteId: string = req.params.websiteId;
      console.log(websiteId);

      const pages = await this.getPagesByWebsiteId.execute(websiteId, user.id);

      res.status(200).json(pages);
    } catch(error){
      res.status(200).json({message: "Ошибка с получением страниц", error: error.message});
    }
  }
  async deletePages(req: Request, res: Response): Promise<void>{
    try{
      const user = this.jwtService.getAccessPayload(req.cookies.access);
      const websiteId: string = req.params.websiteId;
      const url: string = req.body.url;

      await this.deletePageByWebsiteId.execute(websiteId, user.id, url);
      res.status(200).json({ message: "Страница была удалена" });
    } catch(error){
      res.status(500).json({ message: "Ошибка удаление страницы" , error: error.message})
    }
  }
}
export default new PageController();