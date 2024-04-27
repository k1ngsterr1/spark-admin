import { IUserRepository } from "@core/interfaces/IUserRepository";
import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { User } from "@infrastructure/models/userModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class GetWebsiteUsers{
    private websiteRepository: IWebsiteRepository;
    private userRepository: IUserRepository;
    constructor(){
        this.websiteRepository = new WebsiteRepository();
        this.userRepository = new UserRepository();
    }
    async execute(websiteId: string, errors: ErrorDetails[]): Promise<User[]>{
        try{
            const website = await this.websiteRepository.findByPk(websiteId, errors);
            if(website === null){
                errors.push(new ErrorDetails(404, "Вебсайта с таким ID не существует."));
            }
            return website.users;
        }catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Ошибка при получение юзеров с вебсайта"));
            return;
        }
    }
}