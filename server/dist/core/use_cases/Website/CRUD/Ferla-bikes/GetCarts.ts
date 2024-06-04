import { IUserRepository } from "@core/interfaces/IUserRepository";
import { WebsiteCommand } from "@core/utils/types";
import { ErrorDetails } from "@core/utils/utils";
import { validWebsiteUser } from "@core/utils/validators";
import { UserRepository } from "@infrastructure/repositories/UserRepository";

export class GetCarts{
    private userRepository: IUserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async execute(errors: ErrorDetails[]){
        //Request for deleting cart
        // return cart;
    }
}