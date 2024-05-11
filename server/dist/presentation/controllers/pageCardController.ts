import { AddBlock } from "@core/use_cases/PageCard/AddBlock";
import { AddPageCard } from "@core/use_cases/PageCard/AddPageCard";
import { AddBlockRequest, NewPageCardRequest } from "@core/utils/PageCard/Reqeust";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class PageCardController{
    private addPageCardLogic: AddPageCard;
    private addBlockLogic: AddBlock;
    constructor(){
        this.addPageCardLogic = new AddPageCard();
        this.addBlockLogic = new AddBlock();
    }
    async addPageCard(req: Request, res: Response): Promise<void>{
        const errors: ErrorDetails[] = [];
        try{
            const request: NewPageCardRequest = {
                userId: req.user.id,
                url: req.body.url,
                name: req.body.name,
                description: req.body.description,
                type: req.body.type
            }

            const pageCard = await this.addPageCardLogic.execute(request, errors);

            if(errors.length > 0){
                const current_error = errors[0];
                res.status(current_error.code).json({ message: current_error.details });
                return;
            }

            res.status(201).json({ message: "Успешно добавлено!", item: pageCard });
        } catch(error){
            res.status(500).json({ message: "Произошла ошибка при добавление шаблонной карточки." });
        }
    }

    async addBlock(req: Request, res: Response): Promise<void> {
        const errors: ErrorDetails[] = [];
        try{
            const request: AddBlockRequest = {
                userId: req.user.id,
                blockName: req.body.blockName,
                pageCardName: req.body.pageCardName,
            }

            await this.addBlockLogic.execute(request, errors);

            if(errors.length > 0){
                const current_error = errors[0];
                res.status(current_error.code).json({ message: current_error.details });
                return;
            }

            res.status(201).json({ message: "Успешно добавлен блок!" });

        }catch(error){
            res.status(500).json({ message: "Произошла ошибка при соединения с блоком." });
        }
    }
}

export default new PageCardController();