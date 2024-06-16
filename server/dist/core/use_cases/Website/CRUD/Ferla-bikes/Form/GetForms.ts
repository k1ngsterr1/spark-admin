import { ErrorDetails } from "@core/utils/utils";
import RequestManager from "@services/createRequest";

export class GetForms{
    private requestManager: RequestManager;
    constructor(){
        this.requestManager = new RequestManager
    }
    async execute(url: string, errors:ErrorDetails[]){
        const params = {url: url}
        const forms = await this.requestManager.getRequest(params, errors)  
        
        return forms
    }
}