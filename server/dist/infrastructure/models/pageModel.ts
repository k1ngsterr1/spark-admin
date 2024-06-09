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
  HasMany,
} from "sequelize-typescript";
import { Website } from "./websiteModel";
import { PageAttributes } from "@core/utils/types";
import { Component } from "./componentModel";
import { SiteData } from "./siteDataModel";

// Модель для страниц
@Table({
  tableName: "pages",
})
export class Page extends Model<PageAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @HasMany(() => Component)
  components!: Component[];

  @HasMany(() => SiteData)
  siteData!: SiteData[];

  @ForeignKey(() => Website)
  @Column({
    type: DataType.UUID,
    onDelete: "CASCADE",
  })
  websiteId!: string;

  @BelongsTo(() => Website)
  website?: Website;

  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.TEXT)
  content?: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  type!: string;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}