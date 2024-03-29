import { User } from "infrastructure/models/userModel";

export interface NewUserInput {
  username: string;
  email: string;
  password: string;
  verificationCode: string;
}

export interface IUserRepository {
  create(userDetails: NewUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByPk?(primaryKey: string | number): Promise<User | null>;
  findOne(options: { where: { email: string } }): Promise<User | null>;
  changePassword?(userId: number, newPassword: string): Promise<boolean>;
}
