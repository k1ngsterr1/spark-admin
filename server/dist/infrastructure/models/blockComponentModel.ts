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
import { Block } from "./blockModel";
  
  // Модель для компонентов
  @Table({
    tableName: "block-components",
  })
  export class BlockComponent extends Model<ComponentAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => Block)
    @Column({
      type: DataType.INTEGER,
      onDelete: "CASCADE",
    })
    blockId!: number;
  
    @BelongsTo(() => Block)
    block?: Block;
  
    @Column(DataType.STRING)
    name!: string;
  
    @Column(DataType.STRING)
    text!: string;
  
    @Column(DataType.INTEGER)
    componentId!: number;
  
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
  }
  