// services/websiteService.js
import fetch from "node-fetch";
import cheerio from "cheerio";

class WebsiteService {
  constructor() {}

  async fetchHTMLContent(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      return response.text();
    } catch (error) {
      console.error("Ошибка с подгрузкой HTML:", error);
      throw error;
    }
  }

  async checkMetaTag(html: string, expectedCode: string): Promise<boolean> {
    const $ = cheerio.load(html);
    const metaContent = $('meta[name="spark-verification"]').attr("content");

    return metaContent === expectedCode;
  }

  // async getUniqueIdentifierForWebsite(url: string): Promise<string> {}
}

export default WebsiteService;
