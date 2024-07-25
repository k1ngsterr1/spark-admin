import { UserToColorAttributes } from "@core/utils/types";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { User } from "./userModel";
import { Color } from "./colorModel";

@Table({
  tableName: "UserToColor",
  timestamps: false,
})
export class UserToColor extends Model<UserToColorAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  userId!: number;

  @ForeignKey(() => Color)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  colorId!: number;

  @BelongsTo(() => User, "userId")
  user!: User;

  @BelongsTo(() => Color, "colorId")
  color!: Color;
}
