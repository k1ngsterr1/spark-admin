import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { ErrorDetails } from "@core/utils/utils";
import { PageCardRepository } from "@infrastructure/repositories/PageCardRepository";

export class BusinessLanding{
    private pageCardRepository: IPageCardRepository;
    constructor(){
        this.pageCardRepository = new PageCardRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<any>{
        const pageCard = await this.pageCardRepository.findByName("business-landing", errors);

        let data = {};

        for (const block of pageCard.blocks) {
            data[block.name] = {};

            for (const component of block.components) {
                const id = String(component.id)+'-'+String(3);
                data[block.name][component.name] = { id: id, value: component.text };
            }
        }

        return data;
    }
}