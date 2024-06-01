import { IUserRepository } from "@core/interfaces/IUserRepository";
import { NewSiteDataInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { ImageUpload } from "@infrastructure/config/cloudinary";
import { SiteRepository } from "@infrastructure/repositories/SiteRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class UploadImage{
    private siteRepository: SiteRepository;
    private userRepository: IUserRepository;
    constructor(){
        this.siteRepository = new SiteRepository();
        this.userRepository = new UserRepository();
    }
    async execute(componentId: number, imagePath: string, errors: ErrorDetails[]): Promise<void>{
        console.log(componentId, imagePath);

        const url = await ImageUpload(imagePath, errors);

        const imageComponent = await this.siteRepository.findById(componentId);

        if(imageComponent === null){
            errors.push(new ErrorDetails(404, "Не удалось найти картинку."));
            return;
        }

        imageComponent.value = url;
        await imageComponent.save();
    } 
}