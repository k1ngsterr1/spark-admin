import { Table, Column, Model, ForeignKey, CreatedAt, UpdatedAt, DataType, Default, AutoIncrement, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import { PageCard } from './pageCardModel';
import { Block } from './blockModel';
import { CardToBlockAttributes } from '@core/utils/types';

// Модель для моста между блоками и шаблонными страницами
@Table({
    tableName: 'cards-blocks',
})
export default class CardToBlock extends Model<CardToBlockAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => PageCard)
    @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
    pageCardId!: number;

    @ForeignKey(() => Block)
    @Column({ type: DataType.INTEGER, onDelete: 'CASCADE' })
    blockId!: string;

    @BelongsTo(() => PageCard, 'cardId')
    card?: PageCard;

    @BelongsTo(() => Block, 'blockId')
    website?: Block;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}