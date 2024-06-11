import { AddArticleRequest } from "@core/utils/Articles/Request";
import { ErrorDetails } from "@core/utils/utils";
import RequestManager from "@services/createRequest";

export default class AddArticle{
    private requestManager: RequestManager;
    constructor(){
        this.requestManager = new RequestManager();
    }
    async execute(request: AddArticleRequest, errors: ErrorDetails[]): Promise<void>{
        
    }
}