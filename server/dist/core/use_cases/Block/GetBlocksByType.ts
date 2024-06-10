import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { BlockRepository } from "@infrastructure/repositories/BlockRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class GetBlocksByType{
    private blockRepository: IBlockRepository;
    private userRepository: IUserRepository;
    constructor(){
        this.blockRepository = new BlockRepository();
        this.userRepository = new UserRepository();
    }
    async execute(type: string, userId: number, errors: ErrorDetails[]){
        const user = await this.userRepository.findByPk(userId);

        if(!user.isVerified){
            errors.push(new ErrorDetails(403, "Вы не верифицированный пользователь."));
            return;
        }

        const blocks = this.blockRepository.findAllByType(type, errors);
        
        return blocks;
    }
}