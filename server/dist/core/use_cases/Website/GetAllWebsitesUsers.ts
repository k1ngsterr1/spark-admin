import { IWebsiteRepository } from "@core/interfaces/IWebsiteRepository";
import { ErrorDetails } from "@core/utils/utils";
import { Website } from "@infrastructure/models/websiteModel";
import { WebsiteRepository } from "@infrastructure/repositories/WebsiteRepository";

export class AllWebsitesUsers{
    private websiteRepository: IWebsiteRepository;
    constructor(){
        this.websiteRepository = new WebsiteRepository();
    }
    async execute(errors: ErrorDetails[]): Promise<Website[]>{
        const websites = this.websiteRepository.findWebsitesUsers(errors);

        if(websites === null){
            errors.push(new ErrorDetails(404, "Вебсайтов с пользователями не найдено."));
            return [];
        }

        return websites;
    }
}