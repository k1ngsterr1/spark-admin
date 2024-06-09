import { IUserRepository } from "@core/interfaces/IUserRepository";
import { NewSiteDataInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { SiteRepository } from "@infrastructure/repositories/SiteRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddSiteData{
    private siteRepository: SiteRepository;
    private userRepository: IUserRepository;
    constructor(){
        this.siteRepository = new SiteRepository();
        this.userRepository = new UserRepository();
    }
    async execute(userId: number, siteName: string, value: string, errors: ErrorDetails[]): Promise<void>{
        const user = await this.userRepository.findByPk(userId);

        if(!user.isSparkAdmin === null) {
            errors.push(new ErrorDetails(403, "У вас нет таких прав."));
            return;
        }

        const newSiteData: NewSiteDataInput = {
            name: siteName,
            value: value,
        }

        await this.siteRepository.create(newSiteData);
    } 
}