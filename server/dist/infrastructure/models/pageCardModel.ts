import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  BelongsToMany,
  Unique,
} from "sequelize-typescript";
import { PageCardAttributes } from "@core/utils/types";
import CardToBlock from "./cardToblockModel";
import { Block } from "./blockModel";

// Модель для карточек страниц
@Table({
  tableName: "page-cards",
})
export class PageCard extends Model<PageCardAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @BelongsToMany(() => Block, () => CardToBlock)
  blocks!: Block[];

  @Column({
    type: DataType.STRING,
    onDelete: "CASCADE",
  })
  @Column(DataType.STRING)
  url!: string;

  @Unique
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
