import { ErrorDetails } from "@core/utils/utils";
import RequestManager from "@services/createRequest";

export class GetCarts{
    private requestManager: RequestManager;
    constructor(){
        this.requestManager = new RequestManager();
    }
    async execute(url: string = "http://localhost:4001/api/carts/get-carts", errors: ErrorDetails[]){
        console.log(url);
        const params = { url: url };

        const carts = await this.requestManager.getRequest(params, errors);

        return carts;
    }
}