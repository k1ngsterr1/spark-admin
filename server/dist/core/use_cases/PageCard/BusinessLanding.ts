import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { ErrorDetails } from "@core/utils/utils";
import { PageCardRepository } from "@infrastructure/repositories/PageCardRepository";

export class BusinessLanding{
    private pageCardRepository: IPageCardRepository;
    constructor(){
        this.pageCardRepository = new PageCardRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<any>{
        const pageCards = await this.pageCardRepository.findByName("business-landing", errors);
        let data = {};

        for (const block of pageCards.blocks) {
            data[block.name] = {};
            for (const component of block.components) {
                data[block.name][component.name] = component.text;
            }
        }

        return data;
    }
}