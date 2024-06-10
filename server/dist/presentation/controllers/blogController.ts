import { AddCardBlog } from "@core/use_cases/Blog/AddCardBlog";
import { NewBlogCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class BlogCardController {
  private addBlogCard: AddCardBlog;
  constructor() {
    this.addBlogCard = new AddCardBlog();
  }

  async addCardBlog(req: Request, res: Response): Promise<void> {
    const errors: ErrorDetails[] = [];
    try {
      const request: NewBlogCardInput = {
        image: req.body.image,
        title: req.body.title,
        href: req.body.href,
      };

      const blogCard = await this.addBlogCard.execute(request, errors);

      if (errors.length > 0) {
        const current_error = errors[0];
        res.status(current_error.code).json({ message: current_error.details });
        return;
      }

      res.status(201).json({ message: "Успешно добавлено!", item: blogCard });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Произошла ошибка при добавлении карточки блога" });
    }
  }
}

export default new BlogCardController();
