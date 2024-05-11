import { IBlockRepository } from "@core/interfaces/IBlockRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { NewBlockRequest } from "@core/utils/Block/Request";
import { NewBlockInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { Block } from "@infrastructure/models/blockModel";
import { BlockRepository } from "@infrastructure/repositories/BlockRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddBlock{
    private userRepository: IUserRepository;
    private blockRepository: IBlockRepository; 
    constructor(){
        this.userRepository = new UserRepository();
        this.blockRepository = new BlockRepository();
    }
    async execute(request: NewBlockRequest, errors: ErrorDetails[]): Promise<Block>{
        const { userId, name, title, content, css_link, image_url, video_url } = request;
        
        const user = await this.userRepository.findByPk(userId);
        if(user.isSparkAdmin !== true){
            errors.push(new ErrorDetails(401, "Недостаточно прав."));
            return;
        }
        
        const newBlock: NewBlockInput = {
            name: name,
            title: title,
            content: content,
            css_link: css_link,
            image_url: image_url,
            video_url: video_url,
        }
        
        const block = await this.blockRepository.create(newBlock, errors);

        return block;
    }
}