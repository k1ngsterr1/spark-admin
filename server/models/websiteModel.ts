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

export interface UserItems {
  email: string;
  id: number;
  role: string;
}

interface WebsiteAttributes {
  id: string;
  name: string;
  url: string;
  owner: number;
  users: UserItems[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface WebsiteCreationAttributes {
  id: string;
  name: string;
  url: string;
  owner: string;
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

  @Column(DataType.JSONB)
  users!: UserItems[];

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  
}
