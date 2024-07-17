import { ThemeAttributes } from "@core/utils/types";
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

// Модель для цветовых тем в админке
@Table({
  tableName: "theme",
})
export class Theme extends Model<ThemeAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @Default("light")
  @Column(DataType.STRING)
  theme!: string;
}
