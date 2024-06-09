import { IPageRepository } from "@core/interfaces/IPageRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";

export class UploadImage{
    private userRepository: IUserRepository;
    private pageRepository: IPageRepository;
    private requestManager: RequestManager;
    constructor(){
        this.userRepository = new UserRepository();
        this.pageRepository = new PageRepository();
        this.requestManager = new RequestManager();
    }
    async execute(userId: number, websiteId: string, url: string, pageUrl: string, componentId: number, imagePath: string, errors: ErrorDetails[]): Promise<void>{
        const user = await this.userRepository.getUserFromWebsite(websiteId, userId);
        if(!user){
            errors.push(new ErrorDetails(404, "Пользователь не найден."));
            return;
        }
        const isValidUser = await validWebsiteUser(user, WebsiteCommand.update);

        if(!isValidUser){
            errors.push(new ErrorDetails(403, "У вас не достаточно прав."));
            return;
        }

        const page = await this.pageRepository.findByUrlWithCode(pageUrl);
        if (page === null) {
            errors.push(new ErrorDetails(404, "Страница с таким URL существует."));
            return;
        }

        url += `/${componentId}`;
        const params = { url: url };
        const body = { code: page.website.websiteCode ,value: imagePath };

        await this.requestManager.postRequest(params, body, errors)
    } 
}