import { IComponentRepository } from "@core/interfaces/IComponentRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ErrorDetails } from "@core/utils/utils";
import { ComponentRepository } from "@infrastructure/repositories/ComponentRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class DeleteComponent{
    private componentRepository: IComponentRepository;
    private userRepository: IUserRepository;
    
    constructor(){
        this.componentRepository = new ComponentRepository();
        this.userRepository = new UserRepository();
    }
    async execute(id: number, userId: number, errors: ErrorDetails[]): Promise<void>{
        const user = await this.userRepository.findByPk(userId);
        
        if(user === null){
            errors.push(new ErrorDetails(404, "Пользователь не найден."));
            return; 
        }

        if(!user.isSparkAdmin){
            errors.push(new ErrorDetails(403, "У вас нет таких прав."));
            return;
        }

        const component = this.componentRepository.deleteById(id);

        if(component === null){
            errors.push(new ErrorDetails(404, "Компонента не найдена."));
            return;
        }
    }
}