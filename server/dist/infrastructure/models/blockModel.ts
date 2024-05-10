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
    Unique,
    BelongsToMany,
} from "sequelize-typescript";
import { BlockAttributes } from "@core/utils/types";
import { PageCard } from "./pageCardModel";
import CardToBlock from "./cardToblockModel";
  
// Модель для блоков
@Table({
  tableName: "blocks",
})
export class Block extends Model<BlockAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @BelongsToMany(() => PageCard, () => CardToBlock)
    cards!: PageCard;

    @Unique
    @Column(DataType.STRING)
    name!: string;
  
    @Default('Your title is here')
    @Column(DataType.STRING)
    title!: string;

    @Default('Your content is here')
    @Column(DataType.STRING)
    content!: string;

    @Column(DataType.STRING)
    image_url?: string;

    @Column(DataType.STRING)
    video_url?: string;
  
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
}
  