import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  Unique,
  Default,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";

import bcryptjs from "bcryptjs";
import { Website } from "./websiteModel";
import { UserAttributes, UserRole } from "@core/utils/types";
import UserToWebsite from "./userToWebsiteModel";

@Table({
  tableName: "users",
})
export class User extends Model<UserAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @BelongsToMany(() => Website, () => UserToWebsite)
  websites!: Website;

  @Column(DataType.STRING)
  username!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Default("user")
  @Column(DataType.ENUM(...(Object.values(UserRole) as string[])))
  role!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isSparkAdmin?: boolean;

  @Column(DataType.STRING)
  verificationCode?: string;

  @Column(DataType.DATE)
  verificationCodeExpires?: Date;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  private hashPassword(password: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashPasswordHook(instance: User) {
    if (instance.changed("password")) {
      instance.password = instance.hashPassword(instance.password);
    }
  }

  async verifyPassword(password: string): Promise<boolean> {
    return bcryptjs.compare(password, this.password);
  }

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    if (await this.verifyPassword(oldPassword)) {
      this.password = newPassword;
      await this.save();
      return true;
    }
    return false;
  }
}
