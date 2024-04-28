import { NewUserInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { User } from "infrastructure/models/userModel";

export interface IUserRepository {
  create(userDetails: NewUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByPk?(primaryKey: string | number): Promise<User | null>;
  findOne(options: { where: { email: string } }): Promise<User | null>;
  changeUserPassword?(user: User, newPassword: string): Promise<boolean>;
  saveVerificationCode?(user: User, verificationCode: string): Promise<void>;
  updateUser?(userId: number, updateField: string): Promise<any>;
  verifyCode?(user: User, code: string): Promise<boolean>;
  clearVerificationCode(userId: number): Promise<null>;
  cleanUpExpiredCodes(): Promise<void>;
  isValidPassword?(password: string): Promise<boolean>;
  getUserFromWebsite(
    websiteId: string,
    userId: number
  ): Promise<UserToWebsite | null>;
}
