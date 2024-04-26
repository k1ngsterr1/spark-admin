import { Table, Column, Model, ForeignKey, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';
import { User } from './userModel';
import { Website } from './websiteModel';
import { UserToWebsiteAttributes } from '@core/utils/types';

@Table({
    tableName: 'websites-users',
})
export default class UserToWebsite extends Model<UserToWebsiteAttributes> {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @ForeignKey(() => Website)
    @Column(DataType.STRING)
    websiteId!: string;

    @Column(DataType.INTEGER)
    owner!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}