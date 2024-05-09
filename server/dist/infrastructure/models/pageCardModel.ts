import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
} from "sequelize-typescript";
import { Website } from "./websiteModel";
import { PageCardAttributes } from "@core/utils/types";

// Модель для карточек страниц
@Table({
  tableName: "pageCards",
})
export class PageCard extends Model<PageCardAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.UUID,
    onDelete: "CASCADE",
  })
  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  type!: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
