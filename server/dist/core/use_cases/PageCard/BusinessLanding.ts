import { IPageCardRepository } from "@core/interfaces/IPageCardRepository";
import { ErrorDetails } from "@core/utils/utils";
import { PageCardRepository } from "@infrastructure/repositories/PageCardRepository";

export class BusinessLanding{
    private pageCardRepository: IPageCardRepository;
    constructor(){
        this.pageCardRepository = new PageCardRepository();
    }
    async execute( errors: ErrorDetails[]): Promise<any>{
        const pageCard = await this.pageCardRepository.findByName("business-landing", errors);

        let data = {
            header: {},
            block_name: [],
            block_data: [],
            footer: {},
        };

        for (const block of pageCard.blocks) {
            if (block.name === "header" || block.name === "footer") {
                data[block.name] = { id: block.id };
                for (const component of block.components) {
                    const id = `${component.id}-2`;
                    console.log("my component = ", component.name);
                    data[block.name][component.name] = { id: id, value: component.text };
                }
            } else {
                let blockData = {
                    id: block.id
                };

                for (const component of block.components) {
                    const id = `${component.id}-2`;
                    blockData[component.name] = { id: id, value: component.text };
                }

                data.block_name.push(block.name);
                data.block_data[block.name] = blockData;
            }
        }

        return data;
    }
}