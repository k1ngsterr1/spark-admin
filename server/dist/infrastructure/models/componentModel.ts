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
    Default,
} from "sequelize-typescript";
import { ComponentAttributes } from "@core/utils/types";
import { Page } from "./pageModel";
  
// Модель для компонент
@Table({
    tableName: "components",
})
export class Component extends Model<ComponentAttributes>{
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
    text!: string;

    @Column(DataType.INTEGER)
    blockId!: number;
    
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
}