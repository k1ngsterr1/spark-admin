import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { NewBlockInput } from "@core/utils/types";
import { BlockComponent } from "@infrastructure/models/blockComponentModel";
import { Block } from "@infrastructure/models/blockModel";
import sequelize from "infrastructure/config/sequelize";

export class BlockRepository implements IBlockRepository {
    
    async create(blockDetails: NewBlockInput): Promise<Block>{
        return await sequelize.getRepository(Block).create(blockDetails);
    }

    async findByName(name: string): Promise<Block> {
        return await sequelize.getRepository(Block).findOne({
            where: {
                name: name
            },
            include: {
                model: sequelize.getRepository(BlockComponent),
                attributes: ["name", "text"]
            }
        });
    }

    async findById(id: number): Promise<Block>{
        return await sequelize.getRepository(Block).findByPk(id);
    }

}
