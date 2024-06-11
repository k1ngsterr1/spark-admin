import { IUserRepository } from "@core/interfaces/IUserRepository";
import { CartDetails } from "@core/utils/Website/Ferla-bikes/types";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";
import RequestManager from "@services/createRequest";
import fs from 'fs';
import path from "path";

export class AddCart{
    private userRepository: IUserRepository;
    private requestManager: RequestManager;
    constructor(){
        this.userRepository = new UserRepository();
        this.requestManager = new RequestManager();
    }
    async execute(userId: number, websiteId: string, url: string, cartDetails: CartDetails, errors: ErrorDetails[]){
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
        for (const key in cartDetails) {
            if (cartDetails.hasOwnProperty(key)) {
                const value = cartDetails[key as keyof CartDetails] as string;
                if(key !== 'img_url'){
                    form.append(key, value);
                }
                else{
                    const image = new Blob([await fs.promises.readFile(value)]);
                    form.append('image', image, path.basename(value));
                }
            }
        }
        const params = { url: url };

        console.log(user.website.websiteCode);

        form.append('code', user.website.websiteCode);
        console.log(form);

        await this.requestManager.postRequest(params, form, errors);
    }
}