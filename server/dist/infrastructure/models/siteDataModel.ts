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
    BelongsTo,
} from "sequelize-typescript";
import { SiteDataAttributes } from "@core/utils/types";
import { Page } from "./pageModel";

// Модель для компонентов
@Table({
    tableName: "site-data",
})
export class SiteData extends Model<SiteDataAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Page)
    @Column({
      type: DataType.INTEGER,
      onDelete: "CASCADE",
    })
    pageId!: number;

    @BelongsTo(() => Page)
    page?: Page;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    value!: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}  