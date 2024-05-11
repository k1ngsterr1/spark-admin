import { AddPageCard } from "@core/use_cases/PageCard/AddPageCard";
import { NewPageCardRequest } from "@core/utils/PageCard/Reqeust";
import { ErrorDetails } from "@core/utils/utils";
import { Request, Response } from "express";

class PageCardController{
    private addPageCardLogic: AddPageCard;
    constructor(){
        this.addPageCardLogic = new AddPageCard();
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

        }
    }
}