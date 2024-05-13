import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { IPageRepository } from "@core/interfaces/IPageRepository";
import { ErrorDetails } from "@core/utils/utils";
import { PageCardRepository } from "@infrastructure/repositories/PageCardRepository";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import header from "../Widgets/header";
import about from "../Widgets/about";

export class GeneratePage{
    private pageCardRepository: IPageCardRepository;
    constructor(){
        this.pageCardRepository = new PageCardRepository();
    }
    async execute(pageCardName: string, errors: ErrorDetails[]): Promise<string> {
        const pageCard = await this.pageCardRepository.findByName(pageCardName, errors);

        if(pageCard === null){
            errors.push(new ErrorDetails(404, "Не удалось найти карточку."));
            return;
        }
        console.log(pageCard);
        const blocks = pageCard.blocks;

        let page = await header(pageCard);

        page += '<body>\n';
        
        for(const block of blocks){
            const convert = await about(block.title, block.content);
            page += convert;

        }

        page += `
        </body>\n
        </html>
        `;
        return page;
    }
}