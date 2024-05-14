import { IBlockComponentRepository } from "@core/interfaces/IBlockComponentRepository";
import { NewBlockComponentInput, NewBlockInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { BlockComponent } from "@infrastructure/models/blockComponentModel";
import sequelize from "infrastructure/config/sequelize";

export class BlockComponentRepository implements IBlockComponentRepository {
    
    async create(blockComponentDetails: NewBlockComponentInput, errors: ErrorDetails[]): Promise<BlockComponent>{
        try{    
            return await sequelize.getRepository(BlockComponent).create(blockComponentDetails);
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Ошибка при создание компонента"));
        }
    }
}
