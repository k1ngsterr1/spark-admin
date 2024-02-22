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
  

interface OwnerItem {
  name: string;
  role: string;
}

interface WebsiteAttributes {
  id: string;
  name: string;
  owners: OwnerItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface WebsiteCreationAttributes{
    id: string;
    name: string;
    owners: OwnerItem[];
}


@Table({
    tableName: 'websites',
})

export class Website extends Model<WebsiteAttributes>