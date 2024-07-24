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
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";
import { Page } from "./pageModel";
import { User } from "./userModel";
import { WebsiteAttributes } from "@core/utils/types";
import UserToWebsite from "./userToWebsiteModel";
import { Color } from "./colorModel";
import { WebsiteToColor } from "./websiteToColor";

// Модель вебсайта со всеми аттрибутами
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

  @BelongsToMany(() => User, () => UserToWebsite)
  users!: User[];

  @BelongsToMany(() => Color, () => WebsiteToColor)
  colors!: Color[];

  @HasMany(() => Page)
  pages!: Page[];

  @Column(DataType.STRING)
  name!: string;

  @Unique
  @Column(DataType.STRING)
  url!: string;

  @Unique
  @Column(DataType.STRING)
  websiteCode!: string;

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.INTEGER)
  owner!: number;

  @Unique
  @Column(DataType.STRING(400))
  websiteSignature!: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
