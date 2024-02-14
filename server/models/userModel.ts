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
} from "sequelize-typescript";

import bcryptjs from "bcryptjs";
import sequelize from "config/sequelize";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
  role?: string;
}

@Table({
  tableName: "users",
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  username!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Default("user")
  @Column(DataType.STRING)
  role!: string;

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
