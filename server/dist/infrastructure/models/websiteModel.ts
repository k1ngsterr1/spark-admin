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
  HasMany
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";
import { Page } from "./pageModel";
import { User } from "./userModel";

interface WebsiteAttributes {
  id: string;
  name: string;
  url: string;
  owner: number;
  pages: Page[];
  users: User[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: "websites",
})
export class Website extends Model<WebsiteAttributes> {
  @PrimaryKey
  @Default(uuidv4)
  @Unique
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id?: string;

  @HasMany(() => User)
  users!: User[];

  @HasMany(() => Page)
  pages!: Page[];

  @Column(DataType.STRING)
  name!: string;

  @Unique
  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.INTEGER)
  owner!: number;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
