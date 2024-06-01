import { IPageRepository } from "@core/interfaces/IPageRepository";
import { ISiteRepository } from "@core/interfaces/ISiteRepository";
import { IUserRepository } from "@core/interfaces/IUserRepository";
import { NewSiteDataInput } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { PageRepository } from "@infrastructure/repositories/PageRepository";
import { SiteRepository } from "@infrastructure/repositories/SiteRepository";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class AddSiteData{
    private siteRepository: ISiteRepository;
    private userRepository: IUserRepository;
    private pageRepository: IPageRepository;
    constructor(){
        this.siteRepository = new SiteRepository();
        this.userRepository = new UserRepository();
        this.pageRepository = new PageRepository();
    }
    async execute(userId: number, pageUrl: string, siteName: string, value: string, errors: ErrorDetails[]): Promise<void>{
        const user = await this.userRepository.findByPk(userId);
        
        if(!user.isSparkAdmin) {
            errors.push(new ErrorDetails(403, "У вас нет таких прав."));
            return;
        }

        const page = await this.pageRepository.findByUrl(pageUrl);
        if (page === null) {
            errors.push(new ErrorDetails(404, "Страница с таким URL существует."));
            return;
        }

        const newSiteData: NewSiteDataInput = {
            pageId: page.id,
            name: siteName,
            value: value,
        }

        await this.siteRepository.create(newSiteData);
    } 
}