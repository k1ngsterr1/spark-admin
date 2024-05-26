import { NewSiteDataInput } from "@core/utils/types";
import { SiteData } from "@infrastructure/models/siteDataModel";

export interface ISiteRepository{
    create(request: NewSiteDataInput): Promise<SiteData>;
    findById(name: string, id: number): Promise<SiteData>;
}