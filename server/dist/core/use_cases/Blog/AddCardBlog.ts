import { IBlogCardRepository } from "@core/interfaces/IBlogCartRepository";
import { NewBlogCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCard } from "@infrastructure/models/blogCardModel";
import { BlogCardRepository } from "@infrastructure/repositories/BlogCardRepository";

export class AddCardBlog {
  private blogRepository: IBlogCardRepository;
  constructor() {
    this.blogRepository = new BlogCardRepository();
  }

  async execute(
    request: NewBlogCardInput,
    errors: ErrorDetails[]
  ): Promise<BlogCard> {
    const { image, title, href } = request;

    const newBlog: NewBlogCardInput = {
      image: image,
      title: title,
      href: href,
    };

    const blog = await this.blogRepository.create(newBlog, errors);

    return blog;
  }
}
