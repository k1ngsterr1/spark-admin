// services/websiteService.js
import { load, CheerioAPI } from "cheerio";
import puppeteer from 'puppeteer';
import { ElementDetails, ErrorDetails } from "@core/utils/utils";

class WebsiteService {

  constructor() {}

  async fetchHTMLContent(url: string): Promise<string> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const content = await page.content();
      await browser.close();
      return content;
    } catch (error) {
      throw new Error("Не получилось получить HTML страницу");
    }
  }

  async checkMetaTag(url: string, expectedCode: string): Promise<boolean> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the meta tag to be available
    const metaTag = await page.waitForSelector('meta[name="spark-verification"]');
    const metaContent = await page.evaluate(meta => meta.getAttribute("content"), metaTag);

    await browser.close();
    return metaContent === expectedCode;
  }

  async getElements(url: string, errors: ErrorDetails[]): Promise<ElementDetails> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });

      const pageContent = await page.content();
      console.log(pageContent);

      await page.waitForSelector('button[class*="vjs-"]', { visible: true, timeout: 10000 });

      const buttons = await page.$$eval('button[class*="vjs-play-control"]', elements =>
        elements.map(element => element.outerHTML)
      );

      await browser.close();
      return new ElementDetails(buttons);
    } catch (error) {
      console.error('Error:', error);
      errors.push(new ErrorDetails(500, 'Произошла ошибка при получении элементов'));
      return new ElementDetails([]);
    }
  }
  getElementsWithSelector($: CheerioAPI, selector: string): string[] {
    return $(selector).map((index, element) => $(element).prop('outerHTML')).get();
  }
}

export default WebsiteService;
