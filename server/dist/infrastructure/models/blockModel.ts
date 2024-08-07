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
    HasMany,
} from "sequelize-typescript";
import { BlockAttributes } from "@core/utils/types";
import { PageCard } from "./pageCardModel";
import CardToBlock from "./cardToblockModel";
import { BlockComponent } from "./blockComponentModel";
  
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

    @HasMany(() => BlockComponent)
    components!: BlockComponent[];

    @Unique
    @Column(DataType.STRING)
    name!: string;
  
    @Default('Название блока')
    @Column(DataType.STRING)
    title!: string;

    @Default('Описание блока')
    @Column(DataType.STRING)
    description!: string;

    @Column(DataType.STRING)
    type!: string;

    @Column(DataType.STRING)
    image_url?: string;

    @Column(DataType.STRING)
    video_url?: string;

    @Column(DataType.STRING)
    css_link?: string;
  
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
}
  