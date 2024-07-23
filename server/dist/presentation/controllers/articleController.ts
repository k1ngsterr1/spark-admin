import AddArticle from "@core/use_cases/Article/AddArticle";
import { AddArticleRequest } from "@core/utils/Articles/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class ArticleController {
  private addArticleUseCase: AddArticle;
  constructor() {
    this.addArticleUseCase = new AddArticle();
  }
  async addArticle(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: AddArticleRequest = {
        userId: req.user.id,
        content: req.body.content,
      };

      await this.addArticleUseCase.execute(request, errors);
      res.status(201).json({ message: "Статья успешно добавлена." });

      if (errors.length > 0) {
        res.status(errors[0].code).json(errors[0].details);
        return;
      }

      res.status(201).json({ message: "Статья успешно добавлена." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при добавление статьи." });
    }
  }
}

export default new ArticleController();
