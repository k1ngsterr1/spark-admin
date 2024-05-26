import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    PrimaryKey,
} from "sequelize-typescript";
import { SiteDataAttributes } from "@core/utils/types";

// Модель для компонентов
@Table({
    tableName: "site-data",
})
export class SiteData extends Model<SiteDataAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    value!: string;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}