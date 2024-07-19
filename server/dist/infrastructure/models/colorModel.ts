import { ColorAttributes } from "@core/utils/types";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import { User } from "./userModel";
import { UserToColor } from "./userToColorModel";
import { Website } from "./websiteModel";
import { WebsiteToColor } from "./websiteToColor";

@Table({
  tableName: "colors",
  timestamps: false,
})
export class Color extends Model<ColorAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @BelongsToMany(() => User, () => UserToColor)
  users: User[];

  @BelongsToMany(() => Website, () => WebsiteToColor)
  websites: Website[];

  @Unique
  @Column(DataType.STRING)
  value: string;
}
