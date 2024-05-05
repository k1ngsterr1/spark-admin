import { ElementDetails, ErrorDetails } from "@core/utils/utils";
import WebsiteService from "@services/websiteService";

export class GetWebsiteElements {
  private websiteService: WebsiteService;
  constructor() {
    this.websiteService = new WebsiteService();
  }
  async execute(url: string, ownerId: number, errors: ErrorDetails[]): Promise<ElementDetails>{
      try{
          const websiteElements = await this.websiteService.getElements(url, ownerId, errors);

          if(websiteElements === null){
              errors.push(new ErrorDetails(404, "Элементы сайта не найдены"));
          }

          return websiteElements;
      } catch(error){
          errors.push(new ErrorDetails(500, "Произошла ошибка при получение элементов."));
          return;
      }
  }
}
