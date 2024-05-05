// Работа с сервисом для вебсайта
import fetch from "node-fetch";
import { CheerioAPI, load } from "cheerio";
import { ElementDetails, ErrorDetails } from "@core/utils/utils";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { validateCodeWithSignature } from "@core/utils/generateWebsiteCode";

class WebsiteService {
  private websiteRepository: IWebsiteRepository;
  constructor() {
    this.websiteRepository = new WebsiteRepository();
  }

  // Получение страницы
  async fetchHTMLContent(url: string, ownerId: number, errors: ErrorDetails[]): Promise<string> {
    try {
      const website = await this.websiteRepository.findByUrl(ownerId, url, errors);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      // проверка валидации
      const html = await response.text();
      const $ = load(html);

      const code = $(`meta[name="spark-verification"]`).attr('content');
      const isValid = validateCodeWithSignature(code, website.websiteSignature);
      console.log('isValid=',isValid, );
      
      if(!isValid) {
        errors.push(new ErrorDetails(400, "Неправильная сигнатура"));
        return;
      }

      return html;
    } catch (error) {
      console.error("Ошибка с подгрузкой HTML:", error);
      throw error;
    }
  }

  // Проверка мета-тэга вебсайта
  async checkMetaTag(html: string, expectedCode: string): Promise<boolean> {
    const $ = load(html);
    const metaContent = $('meta[name="spark-verification"]').attr("content");

    return metaContent === expectedCode;
  }

  // Получение всех элементов вебсайта: кнопки, ссылки и т.д
  async getElements(url: string, ownerId: number, errors: ErrorDetails[]): Promise<ElementDetails> {
    try {
      const html = await this.fetchHTMLContent(url, ownerId, errors);
      const $ = load(html);

      const elements = new ElementDetails();

      elements.buttons = this.getElementsWithSelector($, '#spark-button');
      elements.paragraphs = this.getElementsWithSelector($, '#spark-p');
      elements.headers = this.getElementsWithSelector($, '#spark-h');

      return elements;
    } catch (error) {
      errors.push(new ErrorDetails(500, "Произошла ошибка при получении элементов"));
      return new ElementDetails();
    }
  }

  // Получение всех элементов вебсайта: кнопки, ссылки и т.д
  getElementsWithSelector($: CheerioAPI, selector: string): string[] {
    return $(selector).map((index, element) => $(element).prop('outerHTML')).get();
  }

  // async getUniqueIdentifierForWebsite(url: string): Promise<string> {}
}

export default WebsiteService;
