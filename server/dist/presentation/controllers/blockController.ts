import { AddBlock } from "@core/use_cases/Block/AddBlock";
import { AddComponent } from "@core/use_cases/Block/AddComponent";
import { AddBlockComponentRequest, NewBlockRequest } from "@core/utils/Block/Request";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express" 
import { TargetType } from "puppeteer";

class BlockController{
    private addBlockLogic: AddBlock;
    private addComponentLogic: AddComponent;
    constructor(){
        this.addBlockLogic = new AddBlock();
        this.addComponentLogic = new AddComponent();
    }
    async addBlock(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const request: NewBlockRequest = {
                userId: req.user.id,
                name: req.body.name,
                title: req.body.title,
                content: req.body.content,
                css_link: req.body.css_link,
                image_url: req.body.image_url,
                video_url: req.body.video_url
            }

            const block = await this.addBlockLogic.execute(request, errors);
            
            if(errors.length > 0){
                const current_error = errors[0];
                res.status(current_error.code).json({ message: current_error.details });
                return;
            }

            res.status(201).json({ message: "Блок успешно добавлен", item: block });
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    }
    async addComponent(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const request: AddBlockComponentRequest = {
                userId: req.user.id,
                blockName: req.body.blockName,
                name: req.body.name,
                text: req.body.text,
                componentId: req.body.componentId,
            }

            await this.addComponentLogic.execute(request, errors);

            if(errors.length > 0){
                const current_error = errors[0];
                res.status(current_error.code).json({ message: current_error.details });
                return;
            }

            res.status(201).json({ message: "Компонента успешно создана." });
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Ошибка при добавления компоненты для блока." });
        }
    }
}

export default new BlockController();