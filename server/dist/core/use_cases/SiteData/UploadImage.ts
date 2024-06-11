import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { ImageUpload } from "@infrastructure/config/cloudinary";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";
import path from "path";
import fs from 'fs';

export class UploadImage{
    private userRepository: IUserRepository;
    private requestManager: RequestManager;
    constructor(){
        this.userRepository = new UserRepository();
        this.requestManager = new RequestManager();
    }
    async execute(userId: number, websiteId: string, url: string, componentId: number, imagePath: string, errors: ErrorDetails[]): Promise<void>{
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

        const form = new FormData();
        const image = new Blob([await fs.promises.readFile(imagePath)]);
        form.append('image', image, path.basename(imagePath));
        form.append('code', user.website.websiteCode);

        url += `/${componentId}`;
        const params = { url: url };
        console.log(form);

        await this.requestManager.postRequest(params, form, errors);
    } 
}