import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    AutoIncrement,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
} from "sequelize-typescript";
import { Website } from "./websiteModel";
import { PageAttributes } from "@core/utils/types";
  
@Table({
    tableName: "pages",
})
export class Page extends Model<PageAttributes>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => Website)
    @Column(DataType.UUID)
    websiteId!: string;

    @BelongsTo(() => Website)
    website?: Website;

    @Column(DataType.STRING)
    url!: string;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    type!: string;
  
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
}