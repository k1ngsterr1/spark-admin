import { IUserRepository } from "core/interfaces/IUserRepository";
import { User } from "infrastructure/models/userModel";
import sequelize from "infrastructure/config/sequelize";
import { NewUserInput } from "@core/utils/types";
import { where } from "sequelize";
import { Website } from "@infrastructure/models/websiteModel";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";

export class UserRepository implements IUserRepository {
  async create(userDetails: NewUserInput): Promise<User> {
    return sequelize.getRepository(User).create(userDetails);
  }

  async findByEmail(email: string): Promise<User | null> {
    return sequelize.getRepository(User).findOne({ where: { email } });
  }

  async findByPk(pk: number): Promise<User | null> {
    return sequelize.getRepository(User).findByPk(pk);
  }

  async findOne(options: { where: { email: string } }): Promise<User | null> {
    return sequelize.getRepository(User).findOne(options);
  }

  async changePassword(user: User, newPassword: string): Promise<boolean> {
    user.password = newPassword;
    await user.save();
    return true;
  }

  async getUserFromWebsite(websiteId: string, userId: number): Promise<UserToWebsite | null>{
    try{
      const userToWebsite = await sequelize.getRepository(UserToWebsite).findOne({
        where:{
          userId: userId,
          websiteId: websiteId,
        }
      });
      return userToWebsite;
    }catch(error){
      console.log(error);
      return;
    }
  }
}
