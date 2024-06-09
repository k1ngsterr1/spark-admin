import { IContentManipulator } from "./../../interfaces/IContentManipulator";
import { ErrorDetails } from "@core/utils/utils";
import { Page } from "@infrastructure/models/pageModel";
import { HtmlContentManipulator } from "manipulators/HtmlContentManipulator";
import puppeteer from "puppeteer";

// Получение контента страницы при помощи puppeteer
export class FetchPageContent {
  private contentManipulator: IContentManipulator;

  constructor() {
    this.contentManipulator = new HtmlContentManipulator();
  }

  async execute(url: string, errors: ErrorDetails[]): Promise<string> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle0" });
      let content = await page.content();
      await browser.close();

      // Манипуляции с HTML контентом
      content = this.contentManipulator.manipulate(content, url);

      return content;
    } catch (error: any | unknown) {
      errors.push(
        new ErrorDetails(500, "Ошибка с проверкой фэтчингом контента веб-сайта")
      );
    }
  }
}
