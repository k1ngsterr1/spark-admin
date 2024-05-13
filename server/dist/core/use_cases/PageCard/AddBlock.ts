import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { AddBlockRequest } from "@core/utils/PageCard/Reqeust";
import { ErrorDetails } from "@core/utils/utils";
import { BlockRepository } from "@infrastructure/repositories/BlockRepository";
import { PageCardRepository } from "@infrastructure/repositories/PageCardRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddBlock{
    private blockRepository: IBlockRepository;
    private pageCardRepository: IPageCardRepository;
    private userRepository: IUserRepository;
    constructor(){
        this.blockRepository = new BlockRepository();
        this.pageCardRepository = new PageCardRepository();
        this.userRepository = new UserRepository();
    }

    async execute(request: AddBlockRequest, errors: ErrorDetails[]): Promise<void>{
        const {userId, blockName, pageCardName} = request;
        const user = await this.userRepository.findByPk(userId);
        const block = await this.blockRepository.findByName(blockName);
        const pageCard = await this.pageCardRepository.findByName(pageCardName, errors);

        if(user.isSparkAdmin !== true) {
            errors.push(new ErrorDetails(401, "Недостаточно прав."));
            return;
        }
        
        if(block === null){
            errors.push(new ErrorDetails(404, "Не удалось найти блок."));
            return;
        }
        if(pageCard === null){
            errors.push(new ErrorDetails(404, "Не удалось найти шаблонную карточку."));
            return;
        }

        await this.pageCardRepository.addBlock(block.id, pageCard.id, errors);
    }
}