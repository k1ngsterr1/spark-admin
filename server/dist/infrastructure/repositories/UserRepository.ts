import { IUserRepository } from "core/interfaces/IUserRepositry";
import { User } from "infrastructure/models/userModel";
import sequelize from "infrastructure/config/sequelize";
import { Repository } from "sequelize-typescript";

export class UserRepository implements IUserRepository {
  async create(userDetails: Omit<User, "id">): Promise<User> {
    return sequelize.getRepository(User).create(userDetails);
  }

  async findByEmail(email: string): Promise<User | null> {
    return sequelize.getRepository(User).findOne({ where: { email } });
  }

  async findByPk(primaryKey: string | number): Promise<User | null> {
    return sequelize.getRepository(User).findByPk(primaryKey);
  }

  async findOne(options: { where: { email: string } }): Promise<User | null> {
    return sequelize.getRepository(User).findOne(options);
  }
}
