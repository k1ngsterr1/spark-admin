import { IUserRepository } from "@core/interfaces/IUserRepository";
import { ChangeUserRoleRequest } from "@core/utils/Website/Request";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import UserToWebsite from "@infrastructure/models/userToWebsiteModel";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class ChangeUserRole{
    private userRepository: IUserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async execute(request: ChangeUserRoleRequest, errors: ErrorDetails[]): Promise<UserToWebsite>{
        try{
            const { websiteID, email, role } = request;
            const user = await this.userRepository.findByEmail(email);
            const userToWebsite = await this.userRepository.getUserFromWebsite(websiteID, user.id);

            const isValidUser = await validWebsiteUser(userToWebsite, WebsiteCommand.update);
            if(!isValidUser){
                errors.push(new ErrorDetails(403, "Не достаточно прав"));
                return;
            }

            userToWebsite.role = role;
            await userToWebsite.save();
            return userToWebsite;
        } catch(error){
            console.log(error);
            errors.push(new ErrorDetails(500, "Произошла непредвиденная ошибка при смене роли пользователю вебсайта."));
        }
    }
}