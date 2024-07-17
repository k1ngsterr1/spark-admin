import { ThemeAttributes } from "@core/utils/types";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
  AutoIncrement,
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

  @Default("light")
  @Column(DataType.STRING)
  theme!: string;
}
