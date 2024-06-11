import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { SiteRepository } from "@infrastructure/repositories/SiteRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";

export class UpdateSite{
    private userRepository: IUserRepository;
    private pageRepository: IPageRepository;
    private requestManager: RequestManager;
    constructor(){
        this.userRepository = new UserRepository();
        this.pageRepository = new PageRepository();
        this.requestManager = new RequestManager();
    }
    async execute(userId: number, websiteId: string, url: string, componentId: number, newValue: string, errors: ErrorDetails[]): Promise<void>{
        const user = await this.userRepository.getUserFromWebsiteWithCode(websiteId, userId);
        if(!user){
            errors.push(new ErrorDetails(404, "Пользователь не найден."));
            return;
        }
        const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);

        if(!isValidUser){
            errors.push(new ErrorDetails(403, "У вас не достаточно прав."));
            return;
        }

        url += `/${componentId}`;
        console.log(url);

        const params = { url: url };
        const body = { code: user.website.websiteCode ,value: newValue };

        await this.requestManager.postRequest(params, body, errors);
    }
}