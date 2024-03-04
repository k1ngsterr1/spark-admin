import { User } from "@models/userModel";

export interface NewUserInput {
    username: string;
    email: string;
    password: string;
    verificationCode: string;
  }

export interface IUserRepository {
    create(userDetails:NewUserInput): Promise<User>;
    findByEmail(email:string): Promise<User | null>
}