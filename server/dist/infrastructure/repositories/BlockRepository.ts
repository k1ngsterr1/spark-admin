import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { NewBlockInput } from "@core/utils/types";
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
            }
        });
    }

}
