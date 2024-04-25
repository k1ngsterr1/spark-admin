import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  Unique,
  Default,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";

import { v4 as uuidv4 } from "uuid";

export interface UserItems {
  email: string;
  id?: number;
  role: string;
}

interface WebsiteAttributes {
  id: string;
  name: string;
  url: string;
  owner: number;
  websiteCode: string;
  users: UserItems[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface WebsiteCreationAttributes {
  id: string;
  name: string;
  url: string;
  owner: number;
  users: UserItems[];
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

  @Unique
  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.INTEGER)
  owner!: number;

  @Unique
  @Column(DataType.STRING)
  websiteCode!: string;

  @Unique
  @Column(DataType.STRING)
  websiteSignature!: string;

  @Column(DataType.JSONB)
  users!: UserItems[];

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
