import { ErrorDetails } from "@core/utils/utils";
import { SiteData } from "@infrastructure/models/siteDataModel";
import { SiteRepository } from "@infrastructure/repositories/SiteRepository";

export class GetSiteDatas{
    private siteRepository: SiteRepository;
    constructor(){
        this.siteRepository = new SiteRepository();
    }
    async execute(siteName: string, errors: ErrorDetails[]): Promise<SiteData[]>{
        const components = await this.siteRepository.findByName(siteName);

        return components;
    }
}