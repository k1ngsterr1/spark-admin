import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  AutoIncrement,
  PrimaryKey,
  Unique,
  Default,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";

interface OwnerItem {
  name: string;
  role: string;
}

interface WebsiteAttributes {
  id: string;
  name: string;
  url: string;
  owners: OwnerItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface WebsiteCreationAttributes {
  id: string;
  name: string;
  url: string;
  owners: OwnerItem[];
}

@Table({
  tableName: "websites",
})
export class Website extends Model<
  WebsiteAttributes,
  WebsiteCreationAttributes
> {
  @PrimaryKey
  @Default(uuidv4)
  @Unique
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id?: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.JSONB)
  owners!: OwnerItem[];

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
