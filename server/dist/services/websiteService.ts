// Работа с сервисом для вебсайта
import fetch from "node-fetch";
import { CheerioAPI, load } from "cheerio";
import { ElementDetails, ErrorDetails } from "@core/utils/utils";

class WebsiteService {
  constructor() {}

  // Получение страницы
  async fetchHTMLContent(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      return response.text();
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
  async getElements(url: string, errors: ErrorDetails[]): Promise<ElementDetails> {
    try {
      const html = await this.fetchHTMLContent(url);
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
