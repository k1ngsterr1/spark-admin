import { LanguageAttributes } from "@core/utils/types";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

// Модель для языков в админке
@Table({
  tableName: "language",
})
export class Language extends Model<LanguageAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @Default("RU")
  @Column(DataType.STRING)
  language!: string;
}
