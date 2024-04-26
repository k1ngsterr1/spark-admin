import { Table, Column, Model, ForeignKey, CreatedAt, UpdatedAt, DataType, Default, HasOne, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { User } from './userModel';
import { Website } from './websiteModel';
import { UserRole, UserToWebsiteAttributes } from '@core/utils/types';

@Table({
    tableName: 'websites-users',
})
export default class UserToWebsite extends Model<UserToWebsiteAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @ForeignKey(() => Website)
    @Column(DataType.STRING)
    websiteId!: string;

    @HasOne(() => User, 'userId')
    user?: User;

    @HasOne(() => Website, 'websiteId')
    website?: Website;

    @Column(DataType.INTEGER)
    owner?: number;

    @Default("user")
    @Column(DataType.ENUM(...Object.values(UserRole) as string[]))
    role!: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isSparkAdmin?: boolean;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}