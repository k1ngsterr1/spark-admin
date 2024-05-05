import { AddPage } from "@core/use_cases/Page/AddPage";
import { DeletePage } from "@core/use_cases/Page/DeletePage";
import { FetchPageContent } from "@core/use_cases/Page/FetchPageContent";
import { GetPage } from "@core/use_cases/Page/GetPage";
import { GetPages } from "@core/use_cases/Page/GetPages";
import { NewPageRequest } from "@core/utils/Page/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class PageController {
  private addPageToWebsite: AddPage;
  private fetchPageContentUseCase: FetchPageContent;
  private getPagesByWebsiteId: GetPages;
  private deletePageByWebsiteId: DeletePage;
  private getPageByUrl: GetPage;
  constructor() {
    this.addPageToWebsite = new AddPage();
    this.fetchPageContentUseCase = new FetchPageContent();
    this.getPagesByWebsiteId = new GetPages();
    this.deletePageByWebsiteId = new DeletePage();
    this.getPageByUrl = new GetPage();
  }

  // Добавление страницы
  async addPage(req: Request, res: Response): Promise<void> {
    let errors: ErrorDetails[] = [];
    try {
      const request: NewPageRequest = {
        websiteId: req.body.websiteId,
        userId: req.user.id,
        url: req.body.url,
        name: req.body.name,
        type: req.body.type,
      };

      await this.addPageToWebsite.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }
      res.status(201).json({ message: "Страница добавлена" });
    } catch (error) {
      res.status(500).json({
        message: "Ошибка добавления страницы для вебсайта",
        error: error.message,
      });
    }
  }

  // Получение страниц
  async getPages(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];

    try {
      const websiteId: string = req.params.websiteId;

      const pages = await this.getPagesByWebsiteId.execute(
        websiteId,
        req.user.id,
        errors
      );

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ pages: pages });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка с получением страниц", error: error.message });
    }
  }

  // Удаление страницы
  async deletePages(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const websiteId: string = req.params.websiteId;
      const url: string = req.body.url;

      await this.deletePageByWebsiteId.execute(
        websiteId,
        req.user.id,
        url,
        errors
      );

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(200).json({ message: "Страница была удалена" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка удаление страницы", error: error.message });
    }
  }

  // Получение страницы
  async getPage(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const url: string = req.params.url;

      const page = await this.getPageByUrl.execute(url, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
      }

      res.status(200).json({ page: page });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при получение страницы" });
    }
  }

  // Получение контента страницы
  async fetchPageContent(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    const { url } = req.query;

    if (errors.length > 0) {
      const current_error = errors[0];
      res.status(current_error.code).json({ message: current_error.details });
    }

    if (typeof url !== "string") {
      res.status(400).send("Введите правильную URL");
      return;
    }

    try {
      const pageContent = await this.fetchPageContentUseCase.execute(
        url,
        errors
      );

      res.json({ html: pageContent });
    } catch (error: any | unknown) {}
    res.status(500).send("Не вышло получить контент страницы");
  }
}
export default new PageController();
