import { ErrorDetails } from "@core/utils/utils";
import { SiteRepository } from "@infrastructure/repositories/SiteRepository";

export class UpdateSite{
    private siteRepository: SiteRepository;
    constructor(){
        this.siteRepository = new SiteRepository();
    }
    async execute(siteName: string, componentId: number, newValue: string, errors: ErrorDetails[]): Promise<void>{
        const component = await this.siteRepository.findById(siteName, componentId);

        if(component === null) {
            errors.push(new ErrorDetails(404, "Не удалось найти компоненту."));
            return;
        }

        component.value = newValue;
        await component.save();
    }
}