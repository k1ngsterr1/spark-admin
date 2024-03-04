import { IUserRepository } from '@interfaces/IUserRepositry';
import { User } from '@models/userModel';
import sequelize from 'config/sequelize';

export class UserRepository implements IUserRepository {
  async create(userDetails: Omit<User, 'id'>): Promise<User> {
    return sequelize.getRepository(User).create(userDetails);
  }

  async findByEmail(email: string): Promise<User | null> {
    return sequelize.getRepository(User).findOne({ where: { email } });
  }

}
