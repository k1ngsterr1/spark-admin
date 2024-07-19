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
import { Website } from "./websiteModel";
import { WebsiteToColorAttributes } from "@core/utils/types";
import { Color } from "./colorModel";

@Table({
  tableName: "WebsiteToColor",
})
export class WebsiteToColor extends Model<WebsiteToColorAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Website)
  @Column({ type: DataType.UUID, onDelete: "CASCADE" })
  websiteId!: string;

  @ForeignKey(() => Color)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  colorId!: number;

  @BelongsTo(() => Website, { foreignKey: "websiteId" })
  website!: Website;

  @BelongsTo(() => Color, { foreignKey: "colorId" })
  color!: Color;
}
