import { IUserRepository } from "@core/interfaces/IUserRepository";
import { FormDetails } from "@core/utils/Website/Ferla-bikes/types";
import { FormAttributes, WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";

export class AddForm{
    private userRepository: IUserRepository;
    private requestManager: RequestManager;
    constructor(){
        this.userRepository = new UserRepository();
        this.requestManager = new RequestManager()
    }

    async execute(userId: number, websiteId: string, url: string, formDetails: FormDetails, errors: ErrorDetails[]){
        const user = await this.userRepository.getUserFromWebsiteWithCode(websiteId, userId);
        if (!user){
            errors.push(new ErrorDetails(404, "Пользователь не найден"));
            return;
        }
        const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);

        if (!isValidUser){
            errors.push(new ErrorDetails(403, "У вас недостаточно прав."))
            return;
        }

        const form = new FormData();
        for (const key in formDetails){
            if (formDetails.hasOwnProperty(key)){
                const value = formDetails[key as keyof FormDetails] as string;
                form.append(key, value)
            }
        }

        const params = {url: url};

        form.append('code', user.website.websiteCode)  
        
        await this.requestManager.postRequest(params, form, errors)
    }
}