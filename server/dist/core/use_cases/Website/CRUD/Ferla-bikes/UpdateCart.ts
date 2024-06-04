import { IUserRepository } from "@core/interfaces/IUserRepository";
import { CartDetails } from "@core/utils/Website/Ferla-bikes/types";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { ImageUpload } from "@infrastructure/config/cloudinary";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class UpdateCart{
    private userRepository: IUserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async execute(userId: number, websiteId: string, cartId: number, cartDetails: CartDetails, errors: ErrorDetails[]){
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

        if(cartDetails.img_url){
            cartDetails.img_url = await ImageUpload(cartDetails.img_url, errors);
        }

        // Upload changes to their DB
    }
}