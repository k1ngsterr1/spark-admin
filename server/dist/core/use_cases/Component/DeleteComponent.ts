import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { ErrorDetails } from "@core/utils/utils";
import { ComponentRepository } from "@infrastructure/repositories/ComponentRepository";

export class DeleteComponent{
    private componentRepository: IComponentRepository;
    constructor(){
        this.componentRepository = new ComponentRepository;
    }
    async execute(id: number, errors: ErrorDetails[]): Promise<void>{
        const component = this.componentRepository.deleteById(id);

        if(component === null){
            errors.push(new ErrorDetails(404, "Компонента не найдена."));
            return;
        }
    }
}