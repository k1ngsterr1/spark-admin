import { NewBlogCardInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlogCard } from "@infrastructure/models/blogCardModel";

export interface IBlogCardRepository {
  // Interface для создание карточки блога
  create?(
    blogCardDetails: NewBlogCardInput,
    errors: ErrorDetails[]
  ): Promise<BlogCard>;
  update?(primaryKey: string | number, updateFields): Promise<BlogCard>;
  delete(primaryKey: string | number): Promise<void>;
  findByPk(primaryKey: string | number): Promise<BlogCard | null>;
}
