import { IBlogCardRepository } from "@core/interfaces/IBlogCartRepository";
import { NewBlogCardInput } from "@core/utils/types";
import { BlogCard } from "@infrastructure/models/blogCardModel";
import sequelize from "infrastructure/config/sequelize";

export class BlogCardRepository implements IBlogCardRepository {
  // Добавление карточки блога
  async create(blogCardDetails: NewBlogCardInput): Promise<BlogCard> {
    return sequelize.getRepository(BlogCard).create(blogCardDetails);
  }

  //   Обновление карточки блога
  async update(primaryKey: string | number, updateFields): Promise<any> {
    try {
      const result = await sequelize
        .getRepository(BlogCard)
        .update(updateFields, {
          where: { id: primaryKey },
        });
    } catch (error) {
      console.error("Ошибка с обновлением полей карточки блога:", error);
    }
  }

  //   Удаление карточки блога
  async delete(primaryKey: string | number): Promise<void> {
    try {
      const result = await sequelize.getRepository(BlogCard).destroy({
        where: {
          id: primaryKey,
        },
      });

      if (result === 0) {
        throw new Error("No records found to delete.");
      }
      console.log(`Deleted ${result} record(s).`);
    } catch (error) {
      console.error("Error deleting the blog card:", error);
      throw error; // Rethrow the error if you want calling function to handle it further.
    }
  }

  //   Поиск по id
  async findByPk(primaryKey: string | number): Promise<BlogCard | null> {
    const blogCard = await sequelize
      .getRepository(BlogCard)
      .findByPk(primaryKey);

    return blogCard;
  }
}
